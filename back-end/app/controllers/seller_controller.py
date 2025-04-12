from flask import Blueprint, request, jsonify
from app.repositories.seller_repository import SellerRepository

seller_controller = Blueprint('seller_controller', __name__, url_prefix='/api/seller')

@seller_controller.route('/add', methods=['POST'])
def add_seller():
    data = request.get_json()

    # Validation (basic)
    if not all(k in data for k in ("name", "email", "phone")):
        return jsonify({"error": "Missing required fields"}), 400

    result = SellerRepository.create_seller(data)
    return jsonify({"message": "Seller added successfully", "seller_id": str(result.inserted_id)}), 201


@seller_controller.route('/login', methods=['POST'])
def login_seller():
    data = request.get_json()

    # Basic validation
    if not all(k in data for k in ("email", "phone")):
        return jsonify({"error": "Email and phone are required"}), 400

    seller = SellerRepository.find_seller_by_email_and_phone(data["email"], data["phone"])
    
    if seller:
        return jsonify({
            "message": "Login successful",
            "seller": {
                "id": str(seller["_id"]),
                "name": seller["name"],
                "email": seller["email"],
                "phone": seller["phone"]
            }
        }), 200
    else:
        return jsonify({"error": "Seller not found or credentials incorrect"}), 401
