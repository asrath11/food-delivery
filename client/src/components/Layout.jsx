import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation/Navigation';

function Layout() {
  return (
    <>
      <Navigation></Navigation>
      <Outlet />
    </>
  );
}

export default Layout;
