// src/context/AppProviders.jsx
import React from 'react';
import { UserAuthProvider } from '../hooks/UserProvider';
import { CartProvider } from './CartProvider';
// import { ThemeProvider } from './ThemeProvider';
// add more providers here as needed

function AppProviders({ children }) {
  return (
    <UserAuthProvider>
      {/* Future providers go here */}
      <CartProvider>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
      </CartProvider>
    </UserAuthProvider>
  );
}
export default AppProviders;
