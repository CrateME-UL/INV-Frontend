import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import ItemInventory from './pages/ItemInventory.tsx';
import ErrorPage from './error-page';
import Items from './pages/Items.tsx';
import Places from './pages/Places.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Navbar from './components/Navbar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ItemInventory />,
    errorElement: <ErrorPage />,
  },

  {
    path: 'items',
    element: <Items />,
  },

  {
    path: 'places',
    element: <Places />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}

    <RouterProvider router={router} />
    <Navbar />
  </React.StrictMode>
);
