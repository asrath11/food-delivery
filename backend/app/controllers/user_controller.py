from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.decorators.rabc import admin_required
from app.models.user import User

users_bp = Blueprint("users", __name__)


@users_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({"message": "There are no users at the moment"}), 200

    users_data = [user.to_dict() for user in users]
    return jsonify(users_data), 200


@users_bp.route("/<name>", methods=["GET"])
def get_user_by_name(name):
    user = User.query.filter_by(name=name).first()
    if user:
        return jsonify({"id": user.id, "name": user.name, "email": user.email}), 200
    else:
        return jsonify({"message": "User not found"}), 404



