from bson import ObjectId
from app.models.property import properties_collection

class PropertyRepository:
    @staticmethod
    def create_property(property_data):
        return properties_collection.insert_one(property_data)

    @staticmethod
    def get_property_by_id(property_id):
        return properties_collection.find_one({"_id": ObjectId(property_id)})

    @staticmethod
    def get_all_properties():
        return list(properties_collection.find())

    @staticmethod
    def update_property(property_id, update_data):
        return properties_collection.update_one({"_id": ObjectId(property_id)}, {"$set": update_data})

    @staticmethod
    def delete_property(property_id):
        return properties_collection.delete_one({"_id": ObjectId(property_id)})
    
    @staticmethod
    def get_property_by_custom_id(custom_id):
        return properties_collection.find_one({"id": custom_id})
    @staticmethod
    def get_properties_by_owner_id(owner_id):
        return list(properties_collection.find({"owner_id": owner_id}))

