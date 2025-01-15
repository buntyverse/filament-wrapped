import React, { useEffect, useState } from "react";
import HyperliquidData from "../platforms/HyperliquidData";
import VertexData from "../platforms/VertexData";
import DYDXData from "../platforms/DYDXData";
import "./Dashboard.css";
import BadgeCard from "../Cards/SummaryCard";
import { FaAngleRight } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import FilamentProData from "../platforms/FilamentProData";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import mintNFT from "../mintNFT";
import MintedToast from "../Cards/MintedToast";
import TwitterAuth from "./TwitterAuth";
import { useAtom } from "jotai";
import { flpAmt } from "../config/atoms";


const Dashboard = ({ walletAddress, handleBackButtonClick }) => {

  const [showToast, setShowToast] = useState(false);
  
  const [showNewComponent, setShowNewComponent] = useState(false);

  const [hyperliquidData, setHyperliquidData] = useState(null);
  const [vertexData, setVertexData] = useState(null);
  const [dydxData, setDydxData] = useState(null);
  const [filamentProdata, setFilamentProData] = useState(null);
  const [flpAmount, setFlpAmount] = useAtom(flpAmt);

  const [dataCards, setDataCards] = useState([]);
  const [isAnyDataAvailable, setIsAnyDataAvailable] = useState(false);

  const [mintingNft, setMintingNft] = useState(false);

  const [isAlreadyMinted, setIsAlreadyMinted] = useState(false);

  const [mintedNft, setMintedNft] = useState("");
  
  useEffect(() => {
  const minted = localStorage.getItem("nftMinted");
  setIsAlreadyMinted(minted === "true");
}, []);

  console.group("Data");
  console.log("hyperliquidData", hyperliquidData);
  console.log("vertexData", vertexData);
  console.log("dydxData", dydxData);
    console.log("filamentProdata", filamentProdata);

  console.groupEnd();

  useEffect(() => {
   
  if (
    (hyperliquidData && hyperliquidData.totalVolume > 0) ||
    (vertexData && vertexData.totalVolume > 0) ||
    (dydxData && dydxData.totalVolume > 0) || 
    (filamentProdata && filamentProdata.Volume > 0) ||
    flpAmount > 0
  ) {
    setIsAnyDataAvailable(true);
    return;
  }

  console.log("Data is available");
  setIsAnyDataAvailable(false);
}, [hyperliquidData, vertexData, dydxData, filamentProdata, walletAddress, flpAmount]);

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

   // Arrange cards based on data availability
  useEffect(() => {
    const cards = [
      { component: HyperliquidData, data: hyperliquidData, setData: setHyperliquidData },
      { component: VertexData, data: vertexData, setData: setVertexData },
      { component: DYDXData, data: dydxData, setData: setDydxData },
      { component: FilamentProData, data: filamentProdata, setData: setFilamentProData },
    ];

    const sortedCards = cards.sort((a, b) => {
      const hasDataA = a.data && a.data.totalVolume > 0;
      const hasDataB = b.data && b.data.totalVolume > 0;
      return hasDataB - hasDataA;
    });

    setDataCards(sortedCards);
  }, [hyperliquidData, vertexData, dydxData, filamentProdata]);

    const handleNFT = async() => {
      try {
        setMintingNft(true);
        const res = await mintNFT(walletAddress)
        console.log("resp", res?.onChain?.status)

        if (res?.onChain?.status === "pending") {
          localStorage.setItem("nftMinted", "true");
            setIsAlreadyMinted(true); 
           setShowToast(true); 
           
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        }
        
      } catch (e) {
        console.error("Error minting NFT:", e);
      } finally {
        setMintingNft(false);
      }
  }

  const getNFTMintedData = async () => { 
      const apiKey = process.env.REACT_APP_GENESIS_API_KEY;

    if (!apiKey) { 
        throw new Error("API key is missing");
    }
    
    const url = `https://web-production-a568b.up.railway.app/bar/`;

    const options = {
        method: "GET",
        headers: {
            "x-client-api-key": apiKey,
        }
      };
      
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("dataaaaa", data);
    
      
      setMintedNft(data?.supply?.minted);

    } catch (err) {
      console.error("Error:", err);
      throw err; 
    }  
  }

  useEffect(() => {
    getNFTMintedData();
  }, [])

  console.log("Number(mintedNft) < 389", Number(mintedNft), Number(mintedNft) < 500)

  return (
    <div className="dashboard-container flex flex-col justify-between items-center z-50 w-full h-full">
       {showToast && <MintedToast />}


      {/* Persistent Back Button */}
      {/* {showNewComponent &&
       } */}

      {/* Main Content */}
      <div className={`data-container flex flex-col !h-full w-full ${showNewComponent ? "justify-center" : "justify-between pb-[40px]"} items-center`}>
        {!showNewComponent ? (
          <div className="screen-1 pt-[40px]">
                <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className="connect-button" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }} className=" justify-end">
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <button onClick={openAccountModal} type="button" className="disconnect-btn press-start-2p-regular text-[16px]">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
            </ConnectButton.Custom>
               <div className="data-section flex-1 flex-wrap mt-6">
            {dataCards.map((card, index) => {
              const CardComponent = card.component;
              return (
                walletAddress && (
                  <div key={index} className="data-card flex-1">
                    <CardComponent
                      walletAddress={walletAddress}
                      updateTotals={updateTotals}
                      setComponentData={card.setData}
                    />
                  </div>
                )
              );
            })}
          </div>
          </div>
       
        ) : (
          <div className="badge-section w-full flex flex-col justify-between px-[103px]">
            <BadgeCard
              walletAddress={walletAddress}
              summaryData={summaryData}
              handleBackClick={handleBackClick}
              />
              {/* {!isAlreadyMinted &&
                <div className="flex justify-center gap-6">
               <button className="back-btn press-start-2p-regular h-fit text-white text-[1.3em]" onClick={handleBackClick}>
                      <p>Back</p>
                </button>
                  <button
          className={`${mintingNft ? "minting-btn" : "connect-btn"} press-start-2p-regular h-fit max-w-[396px] text-[1.3em] flex-1`}
          onClick={handleNFT}
                >
                  <span className="text-black">
                    {mintingNft ? "Minting..." :  "Mint Now"}
                  </span>
        </button>
                </div>
              } */}
                 <div className="flex justify-center items-center">
                         <div className="text-white max-w-fit border border-[#595D74] bg-[#000000] bg-opacity-[50%] flex gap-[12px] items-center justify-center px-[24px] py-[20px] rounded-[9px]">
                          <img src="/warning.svg" className="w-[31px] h-[31px]" />
                          Phase 1 Minted Out
                        </div>
                  </div>
              
          </div>
        )}

        {!isAnyDataAvailable &&
          <div>
            <TwitterAuth/>
          </div>
        }
  
        {!showNewComponent && isAnyDataAvailable ? (
          <div className="w-full flex justify-center items-center">
            <button className="text-black press-start-2p-regular text-[1.3em] connect-btn w-fit" onClick={handleNextClick}>
                Mint Genesis
              </button>
          </div>
 
  ) : !isAnyDataAvailable ? (
              <div className="text-white border border-[#595D74] bg-[#000000] bg-opacity-[50%] flex gap-[12px] items-center justify-center px-[24px] py-[20px] rounded-[9px]">
                <img src="/warning.svg" className="w-[31px] h-[31px]" />
                Not Eligible to mint: Must Have Activity on any of the listed Dapps
              </div>
  ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
