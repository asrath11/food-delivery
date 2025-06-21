import os
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify, current_app
from app.models import db
from app.models.item import Item
from sqlalchemy.exc import SQLAlchemyError

items_bp = Blueprint("items", __name__)

allowed_types = [".png", ".jpg", ".jpeg", ".webp",".avif"]

@items_bp.get("/")
def get_all_items():
    items = Item.query.all()
    if not items:
        return (
            jsonify({"message": "There are no items at the moment", "items": []}),
            200,
        )

    items_data = [item.to_dict() for item in items]
    return jsonify({"results": len(items_data), "item": items_data}), 200


@items_bp.get("/<itemId>")
def get_items_by_id(itemId):
    if not itemId:
        return jsonify({"status": "failed", "message": "Please provide an ID"}), 400

    item = Item.query.filter_by(id=itemId).first()
    if not item:
        return jsonify({"status": "failed", "message": "Item not found"}), 404

    return jsonify({"status": "success", "item": item.to_dict()}), 200


@items_bp.post("/")
def create_items():
    data = request.form.to_dict()

    try:
        name = data.get("name")
        desc = data.get("desc")
        category = data.get("category")
        price = int(data.get("price", 0))  # default to 0 if missing

        is_spicy = data.get("is_spicy", "false").lower() == "true"
        is_popular = data.get("is_popular", "false").lower() == "true"
        is_vegetarian = data.get("is_vegetarian", "false").lower() == "true"

        if "image" not in request.files:
            return jsonify({"status": "failed", "message": "Please provide an image"}), 400

        image = request.files["image"]
        filename = image.filename
        secure_name = secure_filename(filename)
        ext = os.path.splitext(filename)[1]

        if ext not in allowed_types:
            return jsonify({"status": "failed", "message": "Image format not supported"}), 400

        save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], secure_name)
        image.save(save_path)

        relative_path = f"uploads/{secure_name}"

        item = Item(
            name=name,
            desc=desc,
            category=category,
            price=price,
            image=relative_path,
            is_spicy=is_spicy,
            is_popular=is_popular,
            is_vegetarian=is_vegetarian
        )

        db.session.add(item)
        db.session.commit()

        return jsonify({"status": "success", "item": item.to_dict()}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"status": "failed", "message": str(e)}), 500
    except Exception as e:
        return jsonify({"status": "failed", "message": f"Unexpected error: {str(e)}"}), 500


@items_bp.delete("/<itemId>")
def delete_item(itemId):
    try:
        item = Item.query.filter_by(id=itemId).first()
        if not item:
            return jsonify({"status": "failed", "message": "Item not found"}), 404

        # Delete image file if it exists
        image_path = os.path.join(current_app.root_path, item.image)
        if os.path.exists(image_path):
            os.remove(image_path)

        db.session.delete(item)
        db.session.commit()

        return jsonify({"status": "success", "message": "Item deleted successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"status": "failed", "message": str(e)}), 500
    except Exception as e:
        return jsonify({"status": "failed", "message": f"Unexpected error: {str(e)}"}), 500
