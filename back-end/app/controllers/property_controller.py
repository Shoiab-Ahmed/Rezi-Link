from flask import Blueprint, request, jsonify
from app.repositories.property_repository import PropertyRepository
from bson import ObjectId

property_controller = Blueprint("property_controller", __name__)
property_repo = PropertyRepository()

# Create Property
@property_controller.route("/properties", methods=["POST"])
def create_property():
    data = request.json
    if not data.get("title") or not data.get("price"):
        return jsonify({"error": "Title and Price are required"}), 400

    property_repo.create_property(data)
    return jsonify({"message": "Property added successfully"}), 201

# Get All Properties
@property_controller.route("/properties", methods=["GET"])
def get_properties():
    properties = property_repo.get_all_properties()
    for prop in properties:
        prop["_id"] = str(prop["_id"])  # Convert ObjectId to string

    return jsonify(properties), 200
