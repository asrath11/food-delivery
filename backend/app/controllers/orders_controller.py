from flask import Blueprint,jsonify, request
import razorpay
from config import setting

orders_bp = Blueprint("orders", __name__)

client = razorpay.Client(auth=(setting.razorpay_key_id, setting.razorpay_key_secret))
@orders_bp.route("/create-order", methods=["POST"])
def create_order():
    data = request.get_json()
    amount = data.get("amount")
    amount = int(amount)*100
    if not amount:
        return jsonify({"message": "Amount is required"}), 400
    order = client.order.create({"amount": amount, "currency": "INR"})
    return jsonify({"order": order}), 200