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

  // const addressToPass = connectedWalletAddress || walletAddress;

  const addressToPass = '0x62aD2918a18c062D6EDD00Ff2aB5aB4F54E9eB31';
  // FilamentAddress = '0x73E3875C19aA23ac3f4F8F3d1299AaCF2493E2d8';

  const fetchData = () => {
    setIsDashboardVisible(true);
  };

  const handleBackButtonClick = () => {
    setWalletAddress("");
    setIsDashboardVisible(false);
  };


  return (
    <div className="text-white flex flex-col justify-start items-start">
      <ScrollControl isConnected={true} />
      <section className="section h-lvh w-lvw relative section1" id="section1">
        <img src="/spage-bg.webp" className="absolute object-cover bottom-0 w-lvw z-10" />
           <WrappedCircle
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            fetchData={fetchData}
          />
      </section>
      <section className="section h-lvh relative w-lvw" id="section2">
        <img src="/grid-bg.svg" className="absolute object-cover top-0 w-lvw z-10" />
          <Dashboard
            walletAddress={addressToPass}
            handleBackButtonClick={handleBackButtonClick}
          />
      </section>

      {/* mobile view warning */}

      <div className=" flex sm:hidden z-[999] h-lvh w-lvw justify-center items-center fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white text-center py-2">
        Use desktop device for better experience.
      </div>
    </div>
  );
}

export default App;
