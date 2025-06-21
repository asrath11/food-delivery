import axios from 'axios';
import { WISHLIST_URL } from '../constants/config';

console.log(WISHLIST_URL); //for debugging

export const getItemsInWishList = async () => {
  try {
    const res = await axios.get(WISHLIST_URL, {
      withCredentials: true,
    });
    const wishlist = res.data.wishlist;
    return { wishlist };
  } catch (error) {
    console.error(
      'Failed to fetch items in wish list:',
      error.response?.data || error.message
    );
    throw error; // Let the calling function handle the error
  }
};

export const addItemToWishList = async (itemId) => {
  try {
    const res = await axios.post(
      `${WISHLIST_URL}/`,
      { item_id: itemId },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      'Failed to add item to wish list:',
      error.response?.data || error.message
    );
    throw error; // Let the calling function handle the error
  }
};

export const removeItemFromWishList = async (itemId) => {
  try {
    const res = await axios.delete(`${WISHLIST_URL}/${itemId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(
      'Failed to remove item from wish list:',
      error.response?.data || error.message
    );
    throw error; // Let the calling function handle the error
  }
};
