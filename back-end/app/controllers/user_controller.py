from flask import Blueprint, request, jsonify
from app.repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

user_controller = Blueprint("user_controller", __name__)
user_repo = UserRepository()

SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret")

# ----------------- Register User -----------------
@user_controller.route("/users/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    if user_repo.find_by_email(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    role = data.get("role", "user")
    if role not in ["user", "service_provider"]:
        return jsonify({"error": "Invalid role. Must be 'user' or 'service_provider'"}), 400

    hashed_password = generate_password_hash(data["password"])

    new_user = {
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "role": role,
        "contact_limit": 0  # default limit
    }

    user_id = user_repo.create_user(new_user)

    token = jwt.encode({
        "user_id": str(user_id),
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({
        "message": "User registered successfully",
        "token": token,
        "role": role
    }), 201

# ----------------- Login -----------------
@user_controller.route("/users/login", methods=["POST"])
def login():
    data = request.json
    user = user_repo.find_by_email(data["email"])

    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "user_id": str(user["_id"]),
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token, "role": user["role"]}), 200

# ----------------- Update Contact Limit After Plan Purchase -----------------
@user_controller.route("/users/update-limit", methods=["POST"])
def update_contact_limit():
    data = request.json
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "Missing token"}), 401

    try:
        token = auth_header.split(" ")[1]  # 🔥 FIXED HERE
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]

        plan = data.get("plan")
        if plan == "basic":
            limit = 10
        elif plan == "bussiness":
            limit = 25
        else:
            return jsonify({"error": "Invalid plan"}), 400

        user_repo.update_contact_limit(user_id, limit)
        return jsonify({"message": f"{plan.capitalize()} plan activated with {limit} contact views"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------- Unlock Contact Details -----------------
@user_controller.route("/users/unlock-contact", methods=["POST"])
def unlock_contact():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "Missing token"}), 401

    try:
        token = auth_header.split(" ")[1]  # 🔥 Extract token from "Bearer <token>"
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]

        user = user_repo.find_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        current_limit = user.get("contact_limit", 0)

        if current_limit <= 0:
            return jsonify({"error": "Contact view limit exhausted. Please upgrade your plan."}), 403

        user_repo.update_contact_limit(user_id, current_limit - 1)
        return jsonify({
            "message": "Contact unlocked successfully",
            "remaining_limit": current_limit - 1,
            "status" : "success"
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------------- Get Unlock Status -----------------
@user_controller.route("/users/unlock-status/<property_id>", methods=["GET"])
def unlock_status(property_id):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "Missing token"}), 401

    try:
        token = auth_header.split(" ")[1]  # 🔥 Extract token from "Bearer <token>"
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]

        user = user_repo.find_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        current_limit = user.get("contact_limit", 0)
        has_purchased_plan = current_limit > 0  # Check if the user has any contact limit available
        # Optionally, you can also track which properties the user has unlocked by adding another field in the database
        # For now, assume 'has_unlocked' for the specific property as an example

        # For now, just check contact_limit and whether the user has unlocked this property
        unlocked_property = user.get("unlocked_properties", {}).get(property_id, False)

        return jsonify({
            "status": "success",
            "hasPurchased": has_purchased_plan,
            "remainingUnlocks": current_limit,
            "showContact": unlocked_property
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
