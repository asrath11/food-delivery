import os
from dotenv import load_dotenv
from flask import Flask,send_from_directory,jsonify
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from app.models import db
from app.controllers.cart_controller import cart_bp
from app.controllers.user_controller import users_bp
from app.controllers.items_controller import items_bp
from app.controllers.auth_controller import auth_bp
from app.controllers.wishlist_controller import wishlist_bp
from config import setting
from datetime import timedelta


load_dotenv()

bcrypt = Bcrypt()
migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    # Config from .env
    app.config["SECRET_KEY"] = setting.secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = setting.db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = setting.jwt_access_secret
    # Enable JWT in cookies
    app.config["JWT_TOKEN_LOCATION"] = ["cookies","headers"]
    app.config["JWT_COOKIE_SECURE"] = False  # True in production with HTTPS
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # Optional: disable CSRF for dev
    app.config["JWT_SESSION_COOKIE"] = False

    # Fix expiration config
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=15)
    app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    app.config["MAX_CONTENT_LENGTH"] = 20 * 1024 * 1024  # 10 MB
    CORS(app,
     supports_credentials=True,
     origins=["https://food-delivery-admin-45xn.onrender.com","http://localhost:5173"],
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "DELETE", "PUT","PATCH", "OPTIONS"])
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(items_bp, url_prefix="/items")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(cart_bp, url_prefix="/cart")
    app.register_blueprint(wishlist_bp, url_prefix="/wishlist")

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    
    
    return app

    