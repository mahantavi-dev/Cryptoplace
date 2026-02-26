import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import CoinContextProvider from './context/CoinContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CoinContextProvider>
     <App />
    </CoinContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);