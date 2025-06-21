import React from 'react';
import { useUser } from '@/hooks/UserProvider';
import LoginPrompt from '../LoginPrompt';
import { useWishList } from '@/hooks/WishListProvider';
import { API_URL } from '@/constants/config';
import FoodCard from '@/components/food/FoodCard';

function WishList() {
  const { user, isLoading } = useUser();
  const { wishListData, removeFromWishList } = useWishList();
  const wishListItems = wishListData?.wishlist || [];
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-[90vh]'>
        <p className='text-2xl font-bold'>Loading user data...</p>
      </div>
    );
  }
  if (!user) {
    return <LoginPrompt title='WishList' />;
  }
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 p-5'>
      {wishListItems.map((foodItem, index) => (
        <FoodCard
          key={index}
          item={foodItem.item}
          imagePath={`${API_URL}/${foodItem.item.image}`}
          onRemoveFromWishlist={() => removeFromWishList(foodItem.item_id)}
          variant='wishlist'
        />
      ))}
    </div>
  );
}

export default WishList;
