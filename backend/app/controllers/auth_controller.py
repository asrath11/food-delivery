from flask import Blueprint, request, jsonify, make_response
from datetime import datetime,timedelta

from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, set_access_cookies,jwt_required,get_jwt_identity,unset_jwt_cookies

from app.models import db
from app.models.user import User
from app.schemas.user_schema import UserLoginSchema, UserSignupSchema

# Schemas for validating form data
signup_schema = UserSignupSchema()
login_schema = UserLoginSchema()


# Blueprint
auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()


@auth_bp.route("/signup", methods=["POST"])
def create_user():
    form_data = request.form.to_dict()

    errors = signup_schema.validate(form_data)
    if errors:
        return jsonify(errors), 400


    name = form_data.get("name")
    email = form_data.get("email")
    password = form_data.get("password")
    role = form_data.get("role", "user")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    # Hash password using Flask-Bcrypt
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(name=name, email=email, password=hashed_password,role=role)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(email)
    response = make_response(jsonify({"message": "User created", "token": token}), 201)
    set_access_cookies(response, token)
    return response


@auth_bp.route("/login", methods=["POST"])
def login_user():
    form_data = request.form.to_dict()

    errors = login_schema.validate(form_data)
    if errors:
        return jsonify(errors), 400 

    email = form_data["email"]
    password = form_data["password"]

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({"message": "Invalid email or password"}), 401

    expires = datetime.now() + timedelta(hours=24)
    token = create_access_token(identity=email)
    response = make_response(
        jsonify({"message": "Successfully logged In", "user":user.to_dict()}), 200)
    set_access_cookies(response, token,max_age=3600)
    # response.set_cookie("access-token", token, expires=expires,httponly=True)
    return response

@auth_bp.route('/me', methods=["GET"])
@jwt_required()
def get_me():
    email = get_jwt_identity()
    current_user = User.query.filter_by(email=email).first()
    if not current_user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(current_user.to_dict()), 200

@auth_bp.route('/logout', methods=["POST"])
def logout():
    response = make_response(jsonify({"message": "Successfully logged out"}), 200)
    unset_jwt_cookies(response)
    return response