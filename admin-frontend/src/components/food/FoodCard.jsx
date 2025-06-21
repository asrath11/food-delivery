// src/components/FoodCard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Plus, X } from 'lucide-react';
import { useWishList } from '@/hooks/WishListProvider';

function FoodCard({
  item,
  imagePath,
  onAddToCart,
  onRemoveFromWishlist,
  variant = 'default', //default,wishlist
}) {
  const { wishListData, addToWishList, removeFromWishList } = useWishList();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if item is in wishlist when component mounts
  useEffect(() => {
    if (wishListData?.wishlist) {
      const isItemInWishlist = wishListData.wishlist.some(
        (wishlistItem) => wishlistItem.item_id === item.id
      );
      setIsWishlisted(isItemInWishlist);
    }
  }, [wishListData, item.id]);

  const handleWishlistClick = async (item_id) => {
    if (variant === 'default') {
      if (isWishlisted) {
        await removeFromWishList(item_id);
      } else {
        await addToWishList(item_id);
      }
      setIsWishlisted((prev) => !prev); // ✅ Only toggle in default variant
    } else if (variant === 'wishlist') {
      if (onRemoveFromWishlist) {
        await onRemoveFromWishlist(item_id);
      }
    }
  };

  return (
    <Card className='food-card group max-h-[350px] max-w-sm flex flex-col gap-0 p-0'>
      <div className='relative flex-shrink-0'>
        <img
          src={imagePath || item.image}
          alt={item.name}
          className='w-full h-48 object-cover rounded-t-lg'
        />
        {item.popular && (
          <Badge className='absolute top-3 left-3 bg-brand-500 text-white'>
            Popular
          </Badge>
        )}
        {variant === 'default' ? (
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-3 right-3 bg-white/90 hover:bg-white p-2 cursor-pointer'
            onClick={() => handleWishlistClick(item.id)}
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </Button>
        ) : (
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-3 right-3 bg-white/90 hover:bg-white p-2 cursor-pointer'
            onClick={() => handleWishlistClick(item.id)}
          >
            <X className='h-4 w-4 text-gray-400 hover:text-red-500' />
          </Button>
        )}
      </div>

      <CardContent className='p-4 flex flex-col flex-grow'>
        <div className='flex flex-col flex-grow space-y-2'>
          <div className='flex items-center justify-between gap-4 whitespace-nowrap overflow-hidden'>
            <h3 className='font-semibold text-lg text-gray-900 group-hover:text-brand-600 transition-colors'>
              {item.name}
            </h3>
            <div className='flex items-center space-x-1 flex-shrink-0'>
              <Star className='h-4 w-4 text-yellow-400 fill-current' />
              <span className='font-medium'>{item.rating}</span>
            </div>
          </div>

          <p className='text-sm text-gray-600 line-clamp-3 flex-grow'>
            {item.description}
          </p>

          <div className='mt-auto'>
            <div className='flex items-center justify-between text-sm mb-2'>
              <Badge variant='secondary' className='text-xs'>
                {item.category}
              </Badge>
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
              <div className='text-lg font-semibold text-gray-900'>
                ₹{item?.price.toFixed(2)}
              </div>
              {variant !== 'wishlist' && (
                <Button
                  size='sm'
                  className='bg-brand hover:bg-brand hover:text-white cursor-pointer'
                  onClick={() => onAddToCart(item)}
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default FoodCard;
