import { ORDER_URL } from '@/constants/config';
import axios from 'axios';

export const createOrder = async (amount) => {
  try {
    const res = await axios.post(
      `${ORDER_URL}/create-order`,
      { amount },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      'Failed to create order:',
      error.response?.data || error.message
    );
    throw error;
  }
};
