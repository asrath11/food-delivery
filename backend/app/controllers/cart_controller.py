from flask import Blueprint, request, jsonify,g
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.db import db
from app.models.cart import Cart
from app.decorators.current_user import get_current_user

cart_bp = Blueprint("cart", __name__)

@cart_bp.get("/")
@jwt_required()
@get_current_user
def get_cart():
    user_id = g.user.id
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    data = [
        {
            "cart_id": cart.id,
            "item_id": cart.item_id,
            "quantity": cart.quantity,
            "item": cart.item.to_dict()
        }
        for cart in cart_items
    ]

    return jsonify({"items": data, "results": len(data)}), 200

@cart_bp.post("/")
@jwt_required()
@get_current_user
def add_to_cart():
    user_id = g.user.id
    data = request.get_json()
    item_id = data.get("item_id")
    quantity = data.get("quantity", 1)

    if not item_id:
        return jsonify({"error": "Item ID is required"}), 400

    # Check if item is already in cart
    existing = Cart.query.filter_by(user_id=user_id, item_id=item_id).first()
    if existing:
        existing.quantity += quantity
        db.session.commit()
        return jsonify({"message": "Item quantity updated"}), 200

    # Else create a new entry
    try:
        cart_item = Cart(user_id=user_id, item_id=item_id, quantity=quantity)
        db.session.add(cart_item)
        db.session.commit()
        return jsonify({"message": "Item added to cart"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@cart_bp.delete("/<cart_id>")
@jwt_required()
@get_current_user
def remove_from_cart(cart_id):
    user_id = g.user.id
    cart_item = Cart.query.get(cart_id)

    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404

    if cart_item.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 401

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Item removed from cart"}), 200