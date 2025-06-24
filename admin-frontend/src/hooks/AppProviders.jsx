import React from 'react';
import { UserAuthProvider } from '../hooks/UserProvider';
import { CartProvider } from './CartProvider';
import { WishListProvider } from './WishListProvider';
import { ThemeProvider } from './ThemeProvider';

function AppProviders({ children }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='foodie-express-theme'>
      <UserAuthProvider>
        <CartProvider>
          <WishListProvider>{children}</WishListProvider>
        </CartProvider>
      </UserAuthProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
