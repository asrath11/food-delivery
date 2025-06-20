import axios from 'axios';
import { ITEMS_URL } from '@/constants/config';

export const createItem = async (item) => {
  try {
    const res = await axios.post(ITEMS_URL, item, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      'Failed to create item:',
      error.response?.data || error.message
    );
    throw error; // Let the calling function handle the error
  }
};

export const fetchItems = async () => {
  try {
    const res = await axios.get(ITEMS_URL, {
      withCredentials: true,
    });
    return res?.data?.item;
  } catch (error) {
    console.error(
      'Failed to fetch items:',
      error.response?.data || error.message
    );
    throw error; // Let the calling function handle the error
  }
};
