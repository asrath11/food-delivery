import React, { createContext, useContext, useState, useEffect } from "react";
import { addItemToCart, getItemsInCart } from "@/api/cart";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = async (item_id) => {
        try {
            await addItemToCart(item_id);
        } catch (err) {
            console.error("Add to cart error:", err.response?.data || err.message);
        }
    };
    useEffect(() => {
        const fetchCart = async () => {
            const res = await getItemsInCart();
            setCart(res);
        };
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
