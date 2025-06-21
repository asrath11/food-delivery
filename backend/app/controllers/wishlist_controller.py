from flask import Blueprint, request, jsonify,g
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.db import db
from app.models.wishlist import Wishlist
from app.decorators.current_user import get_current_user

wishlist_bp = Blueprint("wishlist", __name__)

@wishlist_bp.post("/")
@jwt_required()
@get_current_user
def add_to_wishlist():
    try:
        current_user = g.user.id
        data = request.get_json()
        item_id = data.get("item_id")

        if not item_id:
            return jsonify({"error": "Item ID is required"}), 400

        wishlist = Wishlist(user_id=current_user, item_id=item_id)
        db.session.add(wishlist)
        db.session.commit()

        return jsonify({"message": "Item added to wishlist"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@wishlist_bp.get("/")
@jwt_required()
@get_current_user
def get_wishlist():
    try:
        current_user = g.user.id
        wishlist = Wishlist.query.filter_by(user_id=current_user).all()
        data = [
            {
                "wishlist_id":wishlist.id,
                "item_id":wishlist.item_id,
                "user_id":wishlist.user_id,
                "item":wishlist.item.to_dict()
            } for wishlist in wishlist
        ]
        return jsonify({"wishlist": data,"results": len(data)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@wishlist_bp.delete("/<item_id>")
@jwt_required()
@get_current_user
def delete_wishlist(item_id):
    try:
        wishlist = Wishlist.query.filter_by(item_id=item_id).first()
        if not wishlist:
            return jsonify({"error": "Wishlist not found"}), 404

        db.session.delete(wishlist)
        db.session.commit()

        return jsonify({"message": "Item removed from wishlist"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# @wishlist_bp.delete("/")
# @jwt_required()
# @get_current_user
# def delete_wishlist():
#     try:
#         user_id = g.user.id
#         wishlist_items = Wishlist.query.filter_by(user_id=user_id).all()

#         if not wishlist_items:
#             return jsonify({"error": "Wishlist not found"}), 404

#         for item in wishlist_items:
#             db.session.delete(item)

#         db.session.commit()

#         return jsonify({"message": "Wishlist removed"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500