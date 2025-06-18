import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/Index';
import { UserAuthProvider } from './hooks/UserProvider';
import Food from './pages/Food';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/AdminDashBoard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      <Route path='/food' element={<Food />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/admin' element={<ProtectedAdminRoute><Profile /></ProtectedAdminRoute>} />
    </Route>
  )
);

function App() {
  return (
      <RouterProvider router={router} />
  );
}
export default App;

