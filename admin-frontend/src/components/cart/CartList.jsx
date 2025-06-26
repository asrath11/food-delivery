// CartList.js (Better name than CartItem for container)
import React from 'react';
import CartItemCard from './CartItemCard';

function CartList({ cartData }) {
  // cartResponse instead of cartData
  if (!cartData?.cart) {
    return (
      <div className='w-1/2 p-6 shadow-lg'>
        <p className='text-2xl font-semibold'>Loading cart items...</p>
      </div>
    );
  }

  const cartItems = cartData?.cart || [];

  if (cartItems.length === 0) {
    return (
      <div className='w-1/2 bg-card text-card-foreground p-6 border'>
        <h2 className='text-2xl font-semibold'>🛒 Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className='bg-card text-card-foreground rounded-2xl shadow-lg w-1/2 border border-gray-200 p-6'>
      <h1 className='text-3xl font-bold mb-10 border-b border-gray-300 pb-4'>
        🛒 Your Cart
      </h1>
      <div className='space-y-8'>
        {cartItems.map(
          (
            cartItem,
            itemIndex // cartItem instead of entry
          ) => (
            <CartItemCard
              key={cartItem.cart_id}
              cartItem={cartItem}
              showSeparator={itemIndex < cartItems.length - 1} // More descriptive
            />
          )
        )}
      </div>
    </div>
  );
}

export default CartList;
