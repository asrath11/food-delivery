// src/context/AppProviders.jsx
import React from 'react';
import { UserAuthProvider } from '../hooks/UserProvider';
import { CartProvider } from './CartProvider';
import { WishListProvider } from './WishListProvider';
// import { ThemeProvider } from './ThemeProvider';
// add more providers here as needed

function AppProviders({ children }) {
  return (
    <UserAuthProvider>
      {/* Future providers go here */}
      <CartProvider>
        <WishListProvider>
          {/* <ThemeProvider> */}
          {children}
          {/* </ThemeProvider> */}
        </WishListProvider>
      </CartProvider>
    </UserAuthProvider>
  );
}
export default AppProviders;
