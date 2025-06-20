import React, { useState, useEffect } from 'react';
import { API_URL } from '@/constants/config';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Heart, Trash, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/CartProvider';

function CartItem({ cartData }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Set initial loading to false after first render
  useEffect(() => {
    setIsInitialLoading(false);
  }, []);

  const handleIncrease = (cart_id, quantity) =>
    updateQuantity(cart_id, quantity + 1);
  const handleDecrease = (cart_id, quantity) => {
    if (quantity > 1) {
      updateQuantity(cart_id, quantity - 1);
    }
  };

  // Show nothing while initially loading
  if (isInitialLoading) {
    return null;
  }

  // If cart data is undefined or null, show loading state
  if (!cartData?.cart) {
    return (
      <div className='w-1/2 bg-white p-6 border border-gray-200 shadow-lg'>
        <p className='text-2xl font-semibold'>Loading cart items...</p>
      </div>
    );
  }

  const cartItems = cartData?.cart || [];

  // Only show empty state if we have confirmed cart data exists and it's empty
  if (cartItems.length === 0) {
    return (
      <div className='w-1/2 bg-white p-6 border border-gray-200 shadow-lg'>
        <h2 className='text-2xl font-semibold'>🛒 Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className='bg-white shadow-lg w-1/2 border border-gray-200 p-6'>
      <h1 className='text-3xl font-bold mb-10 text-gray-900 border-b border-gray-300 pb-4'>
        🛒 Your Cart
      </h1>

      <div className='space-y-8'>
        {cartItems.map((entry, index) => {
          const { cart_id, item, quantity, item_id } = entry;
          return (
            <div key={cart_id}>
              <div className='flex justify-between items-center gap-6 p-6'>
                {/* Left: Image + Info */}
                <div className='flex gap-6 items-center flex-1 min-w-0'>
                  <div className='w-24 h-24 rounded-xl overflow-hidden shadow'>
                    <img
                      src={`${API_URL}/${item.image}`}
                      alt={item.name}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>

                  <div className='flex flex-col justify-between flex-1 space-y-2'>
                    <h2 className='text-lg font-semibold text-gray-900 truncate'>
                      {item.name}
                    </h2>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {item?.desc}
                    </p>

                    <div className='flex gap-3 pt-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='hover:bg-red-50 hover:text-red-500'
                      >
                        <Heart className='w-5 h-5' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='hover:bg-red-50 hover:text-red-500'
                        onClick={() => removeFromCart(cart_id)}
                      >
                        <Trash className='w-5 h-5' />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right: Price + Quantity Controls */}
                <div className='flex flex-col items-end justify-between gap-3 min-w-[140px]'>
                  <h3 className='text-xl font-semibold text-green-600'>
                    ₹{item.price}
                  </h3>

                  <div className='flex items-center gap-3 bg-white rounded-full border border-gray-300 px-3 py-1 shadow-sm'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='w-8 h-8 hover:bg-gray-100 hover:text-red-500'
                      disabled={quantity <= 1}
                      onClick={() => handleDecrease(cart_id, quantity)}
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
                      disabled={quantity >= 5}
                      onClick={() => handleIncrease(cart_id, quantity)}
                    >
                      <Plus className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>

              {index !== cartItems.length - 1 && <Separator />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartItem;
