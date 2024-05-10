import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import TestApp from './TestApp.tsx';
import Inventory from './Inventory.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <TestApp /> */}
    <Inventory />
  </React.StrictMode>
);
