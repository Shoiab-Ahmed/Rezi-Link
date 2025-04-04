from app.models.user import users_collection

class UserRepository:
    def __init__(self):
        self.collection = users_collection
        
    def find_by_username(self, username):
        return self.collection.find_one({"username": username})
    
    def find_by_email(self, email):
        return self.collection.find_one({"email": email})
    
    def create_user(self, user_data):
        user = {
            "username": user_data["username"],
            "email": user_data["email"],
            "password": user_data["password"],  # Hashed password
            "role": user_data.get("role", "user")  # Default role is 'user'
        }
        return self.collection.insert_one(user)
