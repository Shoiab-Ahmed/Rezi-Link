from bson import ObjectId
from app.models.seller_model import sellers_collection

class SellerRepository:
    @staticmethod
    def create_seller(seller_data):
        filtered_data = {
            "name": seller_data.get("name"),
            "email": seller_data.get("email"),
            "phone": seller_data.get("phone")
        }
        return sellers_collection.insert_one(filtered_data)

    @staticmethod
    def get_seller_by_id(seller_id):
        return sellers_collection.find_one({"_id": ObjectId(seller_id)})

    @staticmethod
    def get_all_sellers():
        return list(sellers_collection.find())

    @staticmethod
    def update_seller(seller_id, update_data):
        return sellers_collection.update_one({"_id": ObjectId(seller_id)}, {"$set": update_data})

    @staticmethod
    def delete_seller(seller_id):
        return sellers_collection.delete_one({"_id": ObjectId(seller_id)})
    
    @staticmethod
    def find_seller_by_email_and_phone(email, phone):
        return sellers_collection.find_one({"email": email, "phone": phone})

