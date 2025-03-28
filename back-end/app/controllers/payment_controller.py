from flask import Blueprint, request, jsonify
from app.repositories.payment_repository import PaymentRepository
from app.utils.auth_middleware import token_required

payment_controller = Blueprint("payment_controller", __name__)
payment_repo = PaymentRepository()

# Create Payment (Protected Route)
@payment_controller.route("/payments", methods=["POST"])
@token_required
def create_payment(user_id):
    data = request.json
    if not data.get("amount"):
        return jsonify({"error": "Amount is required"}), 400

    data["user_id"] = user_id  # Assign payment to logged-in user
    payment_repo.create_payment(data)
    return jsonify({"message": "Payment recorded"}), 201
