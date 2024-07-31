import React from 'react';
import ReactDOM from 'react-dom/client';
import { Inventory } from './Inventory';
import AuthProvider from './components/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Inventory />
    </AuthProvider>
  </React.StrictMode>
);
