import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  addItemToCart,
  getItemsInCart,
  updateCartItemQuantity,
  removeCartItemFromCart,
} from '@/api/cart';
import { useUser } from './UserProvider';

// Create the Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({ cart: [], total: 0 });
  const { user, isLoading: userLoading } = useUser();

  const addToCart = async (item_id) => {
    try {
      await addItemToCart(item_id);
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
    } catch (err) {
      console.error('Add to cart error:', err.response?.data || err.message);
    }
  };

  const updateQuantity = async (cart_item_id, quantity) => {
    try {
      await updateCartItemQuantity(cart_item_id, quantity);
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
    } catch (err) {
      console.error('Update quantity error:', err.response?.data || err.message);
    }
  };

  const removeFromCart = async (cart_item_id) => {
    try {
      await removeCartItemFromCart(cart_item_id);
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
    } catch (err) {
      console.error('Remove from cart error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getItemsInCart();
        setCartData(res);
      } catch (err) {
        console.error('Fetch cart error:', err.response?.data || err.message);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
