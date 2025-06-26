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
      <div className='w-full lg:w-auto p-4 lg:p-6 shadow-lg rounded-2xl bg-card'>
        <p className='text-lg lg:text-2xl font-semibold'>Loading summary...</p>
      </div>
    );
  }

  return (
    <div className='bg-card text-card-foreground rounded-2xl shadow-lg w-full border border-gray-200 p-4 sm:p-6'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 lg:mb-10 border-b border-gray-300 pb-3 lg:pb-4'>
        Order Summary
      </h1>

      {/* Cart Summary Details */}
      <div className='space-y-3 sm:space-y-4'>
        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground text-sm sm:text-base'>Subtotal</p>
          <p className='font-semibold text-sm sm:text-base'>₹{cartData.total}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-muted-foreground text-sm sm:text-base'>
            Delivery Fee
          </p>
          <p className='font-semibold text-sm sm:text-base'>Free</p>
        </div>

        <hr className='border-gray-200 my-3 sm:my-4' />

        <div className='flex justify-between items-center font-bold text-lg sm:text-xl'>
          <p>Total</p>
          <p>₹{cartData.total}</p>
        </div>

        <Button className='w-full bg-primary hover:bg-primary/90 hover:text-primary-foreground cursor-pointer mt-4 sm:mt-6 h-12 text-base font-semibold'>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
