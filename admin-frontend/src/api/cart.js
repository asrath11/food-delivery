import axios from 'axios';
import { CART_URL } from '@/constants/config';

// Add item to cart
export const addItemToCart = async (item_id) => {
  try {
    console.log(item_id);
    const res = await axios.post(
      `${CART_URL}/`,
      { item_id },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw error; // Let the calling function handle the error
  }
};

// Get all items in cart
export const getItemsInCart = async () => {
  try {
    const res = await axios.get(CART_URL, {
      withCredentials: true,
    });
    const total = res.data.total;
    const cart = res.data.cart;
    return { total, cart }; // Or just return res.data if you want full control
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (cart_item_id, quantity) => {
  try {
    const res = await axios.patch(
      `${CART_URL}/${cart_item_id}`,
      { quantity },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      'Failed to update cart item quantity:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const removeCartItemFromCart = async (cart_item_id) => {
  try {
    const res = await axios.delete(`${CART_URL}/${cart_item_id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(
      'Failed to remove item from cart:',
      error.response?.data || error.message
    );
    throw error;
  }
};
