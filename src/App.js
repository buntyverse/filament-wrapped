import React, { useState, useEffect } from "react";
import Navbar from "./components/Home/Navbar";
import WrappedCircle from "./components/Home/WrappedCircle";
import Dashboard from "./components/Dashboard/Dashboard";
import { useAccount } from "wagmi";
import './App.css';
import ScrollControl from "./components/Home/ScrollControl";

function App() {
  
  const [walletAddress, setWalletAddress] = useState("");
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const { address: connectedWalletAddress, isConnected } = useAccount();

  const addressToPass = connectedWalletAddress || walletAddress;

  const fetchData = () => {
    setIsDashboardVisible(true);
  };

  const handleBackButtonClick = () => {
    setWalletAddress("");
    setIsDashboardVisible(false);
  };


  return (
    <div className="text-white flex flex-col justify-start items-start">
      <ScrollControl isConnected={isConnected} />
      <section className="section h-lvh w-lvw relative" id="section1">
        <img src="/spage-bg.webp" className="absolute object-cover bottom-0 w-lvw z-10" />
           <WrappedCircle
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            fetchData={fetchData}
          />
      </section>
      <section className="section h-lvh relative w-lvw" id="section2">
        <img src="/grid-bg.svg" className="absolute object-cover bottom-0 w-lvw z-10" />
          <Dashboard
            walletAddress={addressToPass}
            handleBackButtonClick={handleBackButtonClick}
          />
      </section>
    </div>
  );
}

export default App;
