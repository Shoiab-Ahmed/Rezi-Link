from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    result = auth_service.signup(data)
    return jsonify(result), result.get("status", 400)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result = auth_service.login(data)
    return jsonify(result), result.get("status", 400)