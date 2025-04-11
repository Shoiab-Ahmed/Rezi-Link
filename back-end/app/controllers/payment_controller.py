from flask import Blueprint, request, jsonify
from app.repositories.payment_repository import PaymentRepository
from app.utils.auth_middleware import token_required
from app.services import payment_service
import os

payment_controller = Blueprint("payment_controller", __name__)
payment_repo = PaymentRepository()

# 1. Create Razorpay Order (Frontend calls this first)
@payment_controller.route("/payments/create-order", methods=["POST"])
@token_required
def create_order(user_id):
    data = request.get_json()
    amount = data.get("amount")

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    order = payment_service.create_razorpay_order(amount)
    return jsonify({
        "order_id": order["id"],
        "razorpay_key": os.getenv("RAZORPAY_KEY_ID"),
        "amount": order["amount"]
    })

# 2. Verify Razorpay Signature (Frontend calls this after payment)
@payment_controller.route("/payments/verify", methods=["POST"])
@token_required
def verify_payment(user_id):
    data = request.get_json()

    is_valid = payment_service.verify_payment_signature({
        "razorpay_order_id": data["razorpay_order_id"],
        "razorpay_payment_id": data["razorpay_payment_id"],
        "razorpay_signature": data["razorpay_signature"]
    })

    if is_valid:
        # You can now optionally record it in DB
        payment_data = {
            "user_id": user_id,
            "amount": data["amount"],
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"]
        }
        payment_repo.create_payment(payment_data)
        return jsonify({"status": "success", "message": "Payment verified and recorded"})
    else:
        return jsonify({"status": "failed", "message": "Signature verification failed"}), 400
