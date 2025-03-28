from bson import ObjectId
from app.models.transaction import transactions_collection

class TransactionRepository:
    @staticmethod
    def create_transaction(transaction_data):
        return transactions_collection.insert_one(transaction_data)

    @staticmethod
    def get_transaction_by_id(transaction_id):
        return transactions_collection.find_one({"_id": ObjectId(transaction_id)})

    @staticmethod
    def get_all_transactions():
        return list(transactions_collection.find())

    @staticmethod
    def update_transaction(transaction_id, update_data):
        return transactions_collection.update_one({"_id": ObjectId(transaction_id)}, {"$set": update_data})

    @staticmethod
    def delete_transaction(transaction_id):
        return transactions_collection.delete_one({"_id": ObjectId(transaction_id)})
