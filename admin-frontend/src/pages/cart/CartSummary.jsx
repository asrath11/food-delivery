import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

function CartSummary({ cartData }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Set initial loading to false after first render
  useEffect(() => {
    setIsInitialLoading(false);
  }, []);

  // Show nothing while initially loading
  if (isInitialLoading) {
    return null;
  }

  // If cart data is undefined or null, show loading state
  if (!cartData?.cart) {
    return (
      <div className='w-1/4 p-6 shadow-lg'>
        <p className='text-2xl font-semibold'>Loading summary...</p>
      </div>
    );
  }

  return (
    <div className='bg-card text-card-foreground rounded-2xl shadow-lg w-1/4 h-[350px] border border-gray-200 p-6'>
      <h1 className='text-3xl font-bold mb-10 border-b border-gray-300 pb-4'>
        Order Summary
      </h1>

      {/* Cart Summary Details */}
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground'>Subtotal</p>
          <p className='font-semibold'>₹{cartData.total}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground'>Delivery Fee</p>
          <p className='font-semibold'>Free</p>
        </div>

        <div className='flex justify-between items-center font-bold text-xl'>
          <p>Total</p>
          <p>₹{cartData.total}</p>
        </div>

        <Button className='w-full bg-primary hover:bg-primary hover:text-primary-foreground cursor-pointer'>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
