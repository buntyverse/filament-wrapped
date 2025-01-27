import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Wallet } from './components/Providers/Wallet';; // You can add more wallet packages here


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Wallet>
      <App />
    </Wallet>

  </React.StrictMode>
);

