import React from 'react'
import { useUser } from '../hooks/UserProvider';

function Cart() {
    const {user} = useUser();
    console.log(user);
  return (
    <div className='min-h-screen'>
          <h1>Cart</h1>
          {user ? (
            <p>{user.name}</p>
          ) : (
                  <p>Please login to view your cart</p>
                  
          )}
    </div>
  )
}

export default Cart