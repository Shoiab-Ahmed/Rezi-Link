# app/services/seller_service.py
from app.repositories.seller_repository import SellerRepository

class SellerService:
    @staticmethod
    def add_seller(data):
        return SellerRepository.create_seller(data)

    @staticmethod
    def get_seller(seller_id):
        return SellerRepository.get_seller_by_id(seller_id)
