import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserProvider';
import {
  getItemsInWishList,
  addItemToWishList,
  removeItemFromWishList,
} from '@/api/wishlist';

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListData, setWishListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        setIsLoading(true);
        const res = await getItemsInWishList();
        setWishListData(res);
      } catch (error) {
        console.error('Failed to fetch wish list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchWishList();
    }
  }, [user]);

  const addToWishList = async (item) => {
    try {
      setIsLoading(true);
      await addItemToWishList(item);
      const updatedWishList = await getItemsInWishList();
      setWishListData(updatedWishList);
    } catch (err) {
      console.error('Add to wish list error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishList = async (item_id) => {
    try {
      setIsLoading(true);
      await removeItemFromWishList(item_id);
      const updatedWishList = await getItemsInWishList();
      setWishListData(updatedWishList);
    } catch (err) {
      console.error(
        'Remove from wish list error:',
        err.response?.data || err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WishListContext.Provider
      value={{ wishListData, isLoading, addToWishList, removeFromWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};
