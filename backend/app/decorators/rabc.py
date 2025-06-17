from flask import g, jsonify
from functools import wraps
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from app.models.user import User

def admin_required(func):
    @wraps(func)  # <- preserves function metadata
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            email = get_jwt_identity()
            if not email:
                return jsonify({"message": "Unauthorized"}), 401

            user = User.query.filter_by(email=email).first()
            g.user = user  # Optional: store user globally for route access
            if not user:
                return jsonify({"message": "User not found"}), 404

            if user.role != "admin":
                return jsonify({"message": "You are not authorized to access this page"}), 403


        except Exception as e:
            print(f"Auth error: {e}")
            return jsonify({"message": "Invalid token"}), 401

        return func(*args, **kwargs)
    return wrapper
