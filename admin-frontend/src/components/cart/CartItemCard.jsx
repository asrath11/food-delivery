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
      {/* Mobile Layout */}
      <div className='block sm:hidden'>
        <div className='p-4 space-y-4'>
          {/* Top Row: Image and Basic Info */}
          <div className='flex gap-3'>
            <div className='w-20 h-20 rounded-lg overflow-hidden shadow flex-shrink-0'>
              <img
                src={`${API_URL}/${product.image}`}
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex-1 min-w-0'>
              <h2 className='text-base font-semibold line-clamp-2 mb-1'>
                {product.name}
              </h2>
              <p className='text-sm text-gray-400 line-clamp-2'>
                {product?.desc}
              </p>
            </div>

            <div className='flex flex-col items-end justify-between'>
              <h3 className='text-lg font-semibold text-green-600'>
                ₹{product.price}
              </h3>
            </div>
          </div>

          {/* Bottom Row: Controls */}
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-red-50 hover:text-red-500 p-2'
                onClick={handleWishlistClick}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishList ? 'text-red-500 fill-current' : ''
                  }`}
                />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-red-50 hover:text-red-500 p-2'
                onClick={handleRemoveItem}
                aria-label='Remove item from cart'
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>

            <div className='flex items-center gap-2 bg-secondary rounded-full border border-gray-300 px-2 py-1 shadow-sm'>
              <Button
                variant='ghost'
                size='sm'
                className='w-7 h-7 hover:bg-gray-100 hover:text-red-500 p-0'
                disabled={quantity <= 1}
                onClick={decreaseQuantity}
                aria-label='Decrease quantity'
              >
                <Minus className='w-3 h-3' />
              </Button>

              <span className='text-sm font-medium text-secondary-foreground min-w-[1.2rem] text-center'>
                {quantity}
              </span>

              <Button
                variant='ghost'
                size='sm'
                className='w-7 h-7 hover:bg-gray-100 hover:text-green-600 p-0'
                disabled={quantity >= 100}
                onClick={increaseQuantity}
                aria-label='Increase quantity'
              >
                <Plus className='w-3 h-3' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden sm:block'>
        <div className='flex justify-between items-center gap-4 lg:gap-6 p-4 sm:p-6'>
          {/* Left: Product Image + Details */}
          <div className='flex gap-3 sm:gap-4 lg:gap-6 items-center flex-1 min-w-0'>
            <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden shadow flex-shrink-0'>
              <img
                src={`${API_URL}/${product.image}`}
                alt={product.name}
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
              />
            </div>

            <div className='flex flex-col justify-between flex-1 space-y-1 sm:space-y-2 min-w-0'>
              <h2 className='text-base sm:text-lg font-semibold line-clamp-2'>
                {product.name}
              </h2>
              <p className='text-xs sm:text-sm text-gray-400 line-clamp-2'>
                {product?.desc}
              </p>

              <div className='flex gap-2 sm:gap-3 pt-1 sm:pt-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='hover:bg-red-50 hover:text-red-500 w-8 h-8 sm:w-9 sm:h-9'
                  onClick={handleWishlistClick}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isWishList ? 'text-red-500 fill-current' : ''
                    }`}
                  />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='hover:bg-red-50 hover:text-red-500 w-8 h-8 sm:w-9 sm:h-9'
                  onClick={handleRemoveItem}
                  aria-label='Remove item from cart'
                >
                  <Trash className='w-4 h-4 sm:w-5 sm:h-5' />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Price + Quantity Controls */}
          <div className='flex flex-col items-end justify-between gap-2 sm:gap-3 min-w-[120px] sm:min-w-[140px]'>
            <h3 className='text-lg sm:text-xl font-semibold text-green-600'>
              ₹{product.price}
            </h3>

            <div className='flex items-center gap-2 sm:gap-3 bg-secondary rounded-full border border-gray-300 px-2 sm:px-3 py-1 shadow-sm'>
              <Button
                variant='ghost'
                size='icon'
                className='w-7 h-7 sm:w-8 sm:h-8 hover:bg-gray-100 hover:text-red-500'
                disabled={quantity <= 1}
                onClick={decreaseQuantity}
                aria-label='Decrease quantity'
              >
                <Minus className='w-3 h-3 sm:w-4 sm:h-4' />
              </Button>

              <span className='text-sm sm:text-base font-medium text-secondary-foreground min-w-[1.2rem] sm:min-w-[1.5rem] text-center'>
                {quantity}
              </span>

              <Button
                variant='ghost'
                size='icon'
                className='w-7 h-7 sm:w-8 sm:h-8 hover:bg-gray-100 hover:text-green-600'
                disabled={quantity >= 100}
                onClick={increaseQuantity}
                aria-label='Increase quantity'
              >
                <Plus className='w-3 h-3 sm:w-4 sm:h-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showSeparator && <Separator className='mx-4 sm:mx-0' />}
    </div>
  );
}

export default CartItemCard;
