// CartList.js (Better name than CartItem for container)
import React from 'react';
import CartItemCard from './CartItemCard';

function CartList({ cartData }) {
  // cartResponse instead of cartData
  if (!cartData?.cart) {
    return (
      <div className='w-full lg:w-auto p-4 lg:p-6 shadow-lg rounded-2xl bg-card'>
        <p className='text-lg lg:text-2xl font-semibold'>Loading cart items...</p>
      </div>
    );
  }

  const cartItems = cartData?.cart || [];

  if (cartItems.length === 0) {
    return (
      <div className='w-full bg-card text-card-foreground p-4 sm:p-6 border rounded-2xl shadow-lg'>
        <div className='text-center py-8 sm:py-12'>
          <div className='text-4xl sm:text-6xl mb-4'>🛒</div>
          <h2 className='text-xl sm:text-2xl font-semibold mb-2'>
            Your Cart is Empty
          </h2>
          <p className='text-muted-foreground text-sm sm:text-base'>
            Add some items to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-card text-card-foreground rounded-2xl shadow-lg w-full border border-gray-200 p-4 sm:p-6'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 lg:mb-10 border-b border-gray-300 pb-3 lg:pb-4'>
        🛒 Your Cart
        <span className='text-sm sm:text-base font-normal text-muted-foreground ml-2'>
          ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className='space-y-4 sm:space-y-6 lg:space-y-8'>
        {cartItems.map((cartItem, itemIndex) => (
          <CartItemCard
            key={cartItem.cart_id}
            cartItem={cartItem}
            showSeparator={itemIndex < cartItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default CartList;
