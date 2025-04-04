from flask import Blueprint, request, jsonify
from app.repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

user_controller = Blueprint("user_controller", __name__)
user_repo = UserRepository()

SECRET_KEY = os.getenv("SECRET_KEY", "b43c2e5dbac0446c9b752748f29321f4b708e34a5c3e4ddaa3f1d1244f324c9b")

# Register User
@user_controller.route("/users/register", methods=["POST"])
def register():
    data = request.json

    # Validate required fields
    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    if user_repo.find_by_email(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    # Validate role (only "user" or "service_provider" allowed)
    role = data.get("role", "user")
    if role not in ["user", "service_provider"]:
        return jsonify({"error": "Invalid role. Must be 'user' or 'service_provider'"}), 400

    hashed_password = generate_password_hash(data["password"])
    
    user_repo.create_user({
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "role": role
    })

    return jsonify({"message": "User registered successfully"}), 201

# Login User
@user_controller.route("/users/login", methods=["POST"])
def login():
    data = request.json
    user = user_repo.find_by_email(data["email"])

    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT with role included
    token = jwt.encode(
        {
            "user_id": str(user["_id"]),
            "role": user["role"],  # Include role in token
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"token": token, "role": user["role"]}), 200
