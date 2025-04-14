from app.models.user import users_collection
from bson import ObjectId


class UserRepository:
    def __init__(self):
        self.collection = users_collection
    
    def update_contact_limit(self, user_id, new_limit):
        self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"contact_limit": new_limit}})

    def find_by_id(self, user_id):
        return self.collection.find_one({"_id": ObjectId(user_id)})
        
    def find_by_username(self, username):
        return self.collection.find_one({"username": username})
    
    def find_by_email(self, email):
        return self.collection.find_one({"email": email})
    
    def create_user(self, user_data):
        user = {
        "username": user_data["username"],
        "email": user_data["email"],
        "password": user_data["password"],
        "role": user_data.get("role", "user"),
        "contact_limit": user_data.get("contact_limit", 0)  # ✅ Add this line
    }
        result = self.collection.insert_one(user)
        return result.inserted_id

