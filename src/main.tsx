import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import ItemInventory from './pages/ItemInventory.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <ItemInventory />
  </React.StrictMode>
);
