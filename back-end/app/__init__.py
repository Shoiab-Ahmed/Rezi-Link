from flask import Flask
from flask_cors import CORS
from app.controllers.user_controller import user_controller
from app.controllers.property_controller import property_controller
from app.controllers.transaction_controller import transaction_controller
from app.controllers.payment_controller import payment_controller
from app.controllers.seller_controller import seller_controller


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # For development


    # Register blueprints
    app.register_blueprint(user_controller)
    app.register_blueprint(property_controller)
    app.register_blueprint(transaction_controller)
    app.register_blueprint(payment_controller)
    app.register_blueprint(seller_controller)  # 👈 Add this line

    return app
