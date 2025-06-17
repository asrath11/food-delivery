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

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      <Route path='/food' element={<Food />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
}
export default App;

