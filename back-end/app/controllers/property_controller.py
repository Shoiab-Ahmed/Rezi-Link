from flask import Blueprint, request, jsonify
from app.repositories.property_repository import PropertyRepository
from app.utils.auth_middleware import token_required

property_controller = Blueprint("property_controller", __name__)
property_repo = PropertyRepository()

# Create Property (Protected Route)
@property_controller.route("/properties", methods=["POST"])
@token_required
def create_property(user_id):
    data = request.json
    if not data.get("title") or not data.get("price"):
        return jsonify({"error": "Title and Price are required"}), 400

    data["owner_id"] = user_id  # Associate property with logged-in user
    property_repo.create_property(data)
    return jsonify({"message": "Property added successfully"}), 201

# Get All Properties (Public Route)
@property_controller.route("/properties", methods=["GET"])
def get_properties():
    properties = property_repo.get_all_properties()
    for prop in properties:
        prop["_id"] = str(prop["_id"])

    return jsonify(properties), 200


@property_controller.route("/properties/grouped-by-city", methods=["GET"])
def get_properties_grouped_by_city():
    properties = property_repo.get_all_properties()
    grouped = {}

    for prop in properties:
        prop["_id"] = str(prop["_id"])  # Convert ObjectId to string
        city = prop.get("location", {}).get("city", "Unknown")

        if city not in grouped:
            grouped[city] = []
        grouped[city].append(prop)

    return jsonify(grouped), 200

