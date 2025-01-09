import React, { useEffect, useState } from "react";
import HyperliquidData from "../platforms/HyperliquidData";
import VertexData from "../platforms/VertexData";
import DYDXData from "../platforms/DYDXData";
import "./Dashboard.css";
import BadgeCard from "../Cards/SummaryCard";
import { FaAngleRight } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import FilamentProData from "../platforms/FilamentProData";

const Dashboard = ({ walletAddress, handleBackButtonClick }) => {
  const [showNewComponent, setShowNewComponent] = useState(false);

  const [hyperliquidData, setHyperliquidData] = useState(null);
  const [vertexData, setVertexData] = useState(null);
  const [dydxData, setDydxData] = useState(null);
  const [filamentProdata, setFilamentProData] = useState(null);

  const [isAnyDataAvailable, setIsAnyDataAvailable] = useState(false);

  console.group("Data");
  console.log(hyperliquidData);
  console.log(vertexData);
  console.log(dydxData);
  console.groupEnd();

 useEffect(() => {
  if (
    (hyperliquidData && hyperliquidData.totalVolume > 0) ||
    (vertexData && vertexData.totalVolume > 0) ||
    (dydxData && dydxData.totalVolume > 0) || 
    (filamentProdata && filamentProdata.Volume > 0)
  ) {
    setIsAnyDataAvailable(true);
    return;
  }

  console.log("Data is available");
  setIsAnyDataAvailable(false);
}, [hyperliquidData, vertexData, dydxData, filamentProdata]);

  const [summaryData, setSummaryData] = useState({
    totalVolume: 0,
    totalPnL: 0,
    totalAssetsTraded: 0,
    dexChecked: [],
  });

  const updateTotals = (volume, pnl, dex) => {
    setSummaryData((prevTotals) => {
      if (prevTotals.dexChecked.includes(dex)) {
        return prevTotals;
      }
      return {
        totalVolume: prevTotals.totalVolume + volume,
        totalPnL: prevTotals.totalPnL + pnl,
        dexChecked: [...prevTotals.dexChecked, dex],
      };
    });
  };

  const handleNextClick = () => {
    setShowNewComponent(true);
  };

  const handleBackClick = () => {
    if (showNewComponent) {
      setShowNewComponent(false);
    } else {
      handleBackButtonClick();
    }
  };

  console.log("isAnyDataAvailable", isAnyDataAvailable);

  return (
    <div className="dashboard-container">
      {/* Persistent Back Button */}
      {showNewComponent && <button className="back-button" onClick={handleBackClick}>
        <MdArrowBackIos size={24} />
        <p>Back</p>
      </button>}

      {/* Main Content */}
      <div className="data-container">
        {!showNewComponent ? (
          <div className="data-section">
            {walletAddress && (
              <HyperliquidData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
                setHyperliquidData={setHyperliquidData}
              />
            )}
            {walletAddress && (
              <VertexData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
                setVertexData={setVertexData}
              />
            )}
            {walletAddress && (
              <DYDXData
                walletAddress={walletAddress}
                updateTotals={updateTotals}
                setDydxData={setDydxData}
              />
            )}
            {walletAddress && (
              <FilamentProData
                walletAddress={walletAddress}
                setFilamentProData={setFilamentProData}
              />
            )}
          </div>
        ) : (
          <div className="badge-section">
            <BadgeCard
              walletAddress={walletAddress}
              summaryData={summaryData}
              handleBackClick={handleBackClick}
            />
          </div>
        )}
     <div className="next-button-container">
  {!showNewComponent && isAnyDataAvailable ? (
    <button className="next-button" onClick={handleNextClick}>
      Mint Genesis NFT
      <FaAngleRight size={24} />
    </button>
  ) : !isAnyDataAvailable ? (
    <p className="text-white">Not Eligible!</p>
  ) : null}
</div>
      </div>
    </div>
  );
};

export default Dashboard;
