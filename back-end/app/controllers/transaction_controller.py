from flask import Blueprint, request, jsonify
from app.repositories.transaction_repository import TransactionRepository

transaction_controller = Blueprint("transaction_controller", __name__)
transaction_repo = TransactionRepository()

# Create Transaction
@transaction_controller.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.json
    if not data.get("user_id") or not data.get("property_id"):
        return jsonify({"error": "User ID and Property ID are required"}), 400

    transaction_repo.create_transaction(data)
    return jsonify({"message": "Transaction recorded"}), 201
