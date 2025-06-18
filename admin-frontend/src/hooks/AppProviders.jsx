// src/context/AppProviders.jsx
import React from 'react';
import { UserAuthProvider } from '../hooks/UserProvider';
// import { ThemeProvider } from './ThemeProvider';
// import { CartProvider } from './CartProvider';
// add more providers here as needed

function AppProviders({ children }) {
  return (
    <UserAuthProvider>
      {/* Future providers go here */}
      {/* <CartProvider> */}
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
      {/* </CartProvider> */}
    </UserAuthProvider>
  );
}
export default AppProviders;
