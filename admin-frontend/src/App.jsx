import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/Index';
import Food from './pages/Food';
import Login from './pages/Login';
import Cart from './pages/cart/Cart';
import Profile from './pages/AdminDashBoard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import WishList from './pages/wishlist/WishList';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path='/food' element={<Food />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route
          path='/admin'
          element={
            <ProtectedAdminRoute>
              <Profile />
            </ProtectedAdminRoute>
          }
        />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
export default App;
