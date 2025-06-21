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
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: userLoading } = useUser();

  const addToCart = async (item) => {
    try {
      setIsLoading(true);
      await addItemToCart(item.id);
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
    } catch (err) {
      console.error('Add to cart error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cart_item_id, quantity) => {
    try {
      setIsLoading(true);
      await updateCartItemQuantity(cart_item_id, quantity);
    } catch (err) {
      console.error('Update quantity error:', err.response?.data || err.message);
    } finally {
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cart_item_id) => {
    try {
      setIsLoading(true);
      await removeCartItemFromCart(cart_item_id);
    } catch (err) {
      console.error('Remove from cart error:', err.response?.data || err.message);
    } finally {
      const updatedCart = await getItemsInCart();
      setCartData(updatedCart);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await getItemsInCart();
        setCartData(res);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setIsLoading(false);
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
        isLoading,
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
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
