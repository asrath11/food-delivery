import axios from "axios";
import { CART_URL } from "@/constants/config";

export const addItemToCart = async (item_id) => {
    const res = await axios.post(
        CART_URL,
        { item_id },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

export const getItemsInCart = async () => {
    const res = await axios.get(CART_URL, { withCredentials: true });
    return res.data.cart;
};

