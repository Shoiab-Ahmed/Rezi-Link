from flask import Blueprint, request, jsonify
from app.repositories.payment_repository import PaymentRepository

payment_controller = Blueprint("payment_controller", __name__)
payment_repo = PaymentRepository()

# Create Payment
@payment_controller.route("/payments", methods=["POST"])
def create_payment():
    data = request.json
    if not data.get("user_id") or not data.get("amount"):
        return jsonify({"error": "User ID and Amount are required"}), 400

    payment_repo.create_payment(data)
    return jsonify({"message": "Payment recorded"}), 201
