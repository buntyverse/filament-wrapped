import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@interchain-ui/react/styles";
import App from './App';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leapwallets } from "@cosmos-kit/leap";
import { chains, assets
 } from 'chain-registry'; // You can add more wallet packages here
; // You can add more wallet packages here




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ChainProvider
      chains={chains} 
      wallets={[ ...leapwallets, ...keplr]}
      assetLists={assets} // Stargaze chain // Keplr wallet or any other supported wallets
    ><App /></ChainProvider>

  </React.StrictMode>
);

