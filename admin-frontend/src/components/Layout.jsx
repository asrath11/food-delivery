import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import AppProviders from '../hooks/AppProviders';

function Layout() {
  return (
    <AppProviders>
      <Navigation></Navigation>
      <Outlet />
    </AppProviders>
  );
}

export default Layout;
