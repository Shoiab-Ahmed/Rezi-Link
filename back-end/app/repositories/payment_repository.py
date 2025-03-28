from bson import ObjectId
from app.models.payment import payments_collection

class PaymentRepository:
    @staticmethod
    def create_payment(payment_data):
        return payments_collection.insert_one(payment_data)

    @staticmethod
    def get_payment_by_id(payment_id):
        return payments_collection.find_one({"_id": ObjectId(payment_id)})

    @staticmethod
    def get_all_payments():
        return list(payments_collection.find())

    @staticmethod
    def update_payment(payment_id, update_data):
        return payments_collection.update_one({"_id": ObjectId(payment_id)}, {"$set": update_data})

    @staticmethod
    def delete_payment(payment_id):
        return payments_collection.delete_one({"_id": ObjectId(payment_id)})
