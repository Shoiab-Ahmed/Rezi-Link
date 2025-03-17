import os
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from app.repositories.user_repository import UserRepository  

class AuthService:
    def __init__(self):
        self.secret_key = os.getenv("SECRET_KEY", "default_secret")
        self.user_repo = UserRepository()

    def signup(self, data):
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Validate required fields
        if not username or not email or not password:
            return {"message": "Username, email, and password are required", "status": 400}

        # Check if username already exists
        if self.user_repo.find_by_username(username):
            return {"message": "Username already exists", "status": 400}

        # Check if email already exists
        if self.user_repo.find_by_email(email):
            return {"message": "User with this email already exists", "status": 400}

        # Hash password and store user
        hashed_password = generate_password_hash(password)
        user_data = {"username": username, "email": email, "password": hashed_password}
        self.user_repo.create_user(user_data)

        return {"message": "User created successfully", "status": 201}

    def login(self, data):
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required", "status": 400}

        user = self.user_repo.find_by_email(email)
        if not user or not check_password_hash(user["password"], password):
            return {"message": "Invalid credentials", "status": 401}

        # Generate JWT token
        token_payload = {
            "email": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=2)  # Token expires in 2 hours
        }
        token = jwt.encode(token_payload, self.secret_key, algorithm="HS256")

        return {"message": "Login successful", "token": token, "status": 200}
