from flask import Blueprint, request, jsonify
from app.repositories.property_repository import PropertyRepository
from app.utils.auth_middleware import token_required
import random

property_controller = Blueprint("property_controller", __name__)
property_repo = PropertyRepository()

city_code_map = {
    "Bangalore": "BNG",
    "Delhi": "DEL",
    "Mumbai": "MUM",
    "Hyderabad": "HYD"
}
def generate_unique_property_id(city_name, max_attempts=10):
    prefix = city_code_map.get(city_name)
    if not prefix:
        raise ValueError("Unsupported city for property ID generation")

    for _ in range(max_attempts):
        random_number = random.randint(100, 999)
        property_id = f"{prefix}{random_number}"

        if not PropertyRepository.get_property_by_custom_id(property_id):
            return property_id

    raise Exception("Failed to generate a unique property ID after several attempts.")

# Create Property (Protected Route)
@property_controller.route("/properties", methods=["POST"])
@token_required
def create_property(user_id):
    data = request.json

    if not data.get("title") or not data.get("price"):
        return jsonify({"error": "Title and Price are required"}), 400

    city = data.get("location", {}).get("city")
    if not city or city not in city_code_map:
        return jsonify({"error": "City must be one of Bangalore, Delhi, Mumbai, or Hyderabad"}), 400

    data["id"] = generate_unique_property_id(city)
    data["owner_id"] = user_id

    property_repo.create_property(data)
    return jsonify({"message": "Property added successfully"}), 201



# Get All Properties (Public Route)
@property_controller.route("/properties", methods=["GET"])
def get_properties():
    properties = property_repo.get_all_properties()
    for prop in properties:
        prop["_id"] = str(prop["_id"])

    return jsonify(properties), 200

# grouped by city
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

# Get Properties by Owner (Protected Route)
@property_controller.route("/my-properties", methods=["GET"])
@token_required
def get_my_properties(user_id):
    properties = property_repo.get_properties_by_owner_id(user_id)
    for prop in properties:
        prop["_id"] = str(prop["_id"])
    return jsonify(properties), 200


# Delete Property (Protected Route)
@property_controller.route("/properties/<property_id>", methods=["DELETE"])
@token_required
def delete_property(user_id, property_id):
    property_data = property_repo.get_property_by_id(property_id)

    if not property_data:
        return jsonify({"error": "Property not found"}), 404

    if str(property_data.get("owner_id")) != user_id:
        return jsonify({"error": "Unauthorized to delete this property"}), 403

    property_repo.delete_property(property_id)
    return jsonify({"message": "Property deleted successfully"}), 200


# Update Property (Protected Route)
@property_controller.route("/properties/<property_id>", methods=["PUT"])
@token_required
def update_property(user_id, property_id):
    data = request.json

    # Check if property exists
    property_data = property_repo.get_property_by_id(property_id)
    if not property_data:
        return jsonify({"error": "Property not found"}), 404

    # Check ownership
    if str(property_data.get("owner_id")) != user_id:
        return jsonify({"error": "Unauthorized to update this property"}), 403

    # Perform update
    updated_property = property_repo.update_property(property_id, data)
    if updated_property:
        updated_property["_id"] = str(updated_property["_id"])
        return jsonify({"message": "Property updated successfully", "property": updated_property}), 200
    else:
        return jsonify({"error": "Failed to update property"}), 500
