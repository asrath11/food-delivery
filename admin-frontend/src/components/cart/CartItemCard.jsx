import React, { useEffect, useState } from 'react';
import { API_URL } from '@/constants/config';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Heart, Trash, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/CartProvider';
import { useWishList } from '@/hooks/WishListProvider';

function CartItemCard({ cartItem, showSeparator }) {
  const [isWishList, setIsWishList] = useState(false); // More descriptive
  const { updateQuantity, removeFromCart } = useCart(); // More specific names
  const { addToWishList, removeFromWishList, wishListData } = useWishList();

  useEffect(() => {
    if (wishListData?.wishlist) {
      const isItemInWishlist = wishListData.wishlist.some(
        (wishlistItem) => wishlistItem.item_id === cartItem.item_id
      );
      setIsWishList(isItemInWishlist);
    }
  }, [wishListData, cartItem.item_id]);
  const {
    cart_id: cartId,
    item: product,
    quantity,
    item_id: productId,
  } = cartItem;

  const handleWishlistClick = () => {
    if (isWishList) {
      removeFromWishList(productId);
    } else {
      addToWishList(productId);
    }
    setIsWishList(!isWishList);
  };
  const increaseQuantity = () => {
    updateQuantity(cartId, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(cartId, quantity - 1);
    }
  };

  const handleRemoveItem = () => removeFromCart(cartId);

  return (
    <div>
      <div className='flex justify-between items-center gap-6 p-6'>
        {/* Left: Product Image + Details */}
        <div className='flex gap-6 items-center flex-1 min-w-0'>
          <div className='w-24 h-24 rounded-xl overflow-hidden shadow'>
            <img
              src={`${API_URL}/${product.image}`}
              alt={product.name}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>

          <div className='flex flex-col justify-between flex-1 space-y-2'>
            <h2 className='text-lg font-semibold text-gray-900 truncate'>
              {product.name}
            </h2>
            <p className='text-sm text-gray-600 line-clamp-2'>{product?.desc}</p>

            <div className='flex gap-3 pt-2'>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-red-50 hover:text-red-500'
                onClick={handleWishlistClick}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishList ? 'text-red-500 fill-current' : ''
                  }`}
                />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-red-50 hover:text-red-500'
                onClick={handleRemoveItem}
                aria-label='Remove item from cart'
              >
                <Trash className='w-5 h-5' />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Price + Quantity Controls */}
        <div className='flex flex-col items-end justify-between gap-3 min-w-[140px]'>
          <h3 className='text-xl font-semibold text-green-600'>
            ₹{product.price}
          </h3>

          <div className='flex items-center gap-3 bg-white rounded-full border border-gray-300 px-3 py-1 shadow-sm'>
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8 hover:bg-gray-100 hover:text-red-500'
              disabled={quantity <= 1}
              onClick={decreaseQuantity}
              aria-label='Decrease quantity'
            >
              <Minus className='w-4 h-4' />
            </Button>

            <span className='text-base font-medium text-gray-800 min-w-[1.5rem] text-center'>
              {quantity}
            </span>

            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8 hover:bg-gray-100 hover:text-green-600'
              disabled={quantity >= 100}
              onClick={increaseQuantity}
              aria-label='Increase quantity'
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      {showSeparator && <Separator />}
    </div>
  );
}

export default CartItemCard;
