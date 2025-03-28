from flask import Blueprint, request, jsonify
from app.repositories.transaction_repository import TransactionRepository
from app.utils.auth_middleware import token_required

transaction_controller = Blueprint("transaction_controller", __name__)
transaction_repo = TransactionRepository()

# Create Transaction (Protected Route)
@transaction_controller.route("/transactions", methods=["POST"])
@token_required
def create_transaction(user_id):
    data = request.json
    if not data.get("property_id"):
        return jsonify({"error": "Property ID is required"}), 400

    data["buyer_id"] = user_id  # Assign the transaction to logged-in user
    transaction_repo.create_transaction(data)
    return jsonify({"message": "Transaction recorded"}), 201
