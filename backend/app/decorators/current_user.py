from functools import wraps
from flask import g, jsonify
from flask_jwt_extended import get_jwt_identity,verify_jwt_in_request
from app.models.user import User

def get_current_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        identity = get_jwt_identity()
        user = User.query.filter_by(email=identity).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        g.user = user
        return func(*args, **kwargs)
    return wrapper
