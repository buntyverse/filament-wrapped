import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import BadgeCard from "../Cards/SummaryCard";
import { FaAngleRight } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import mintNFT from "../mintNFT";
import MintedToast from "../Cards/MintedToast";
import TwitterAuth from "./TwitterAuth";
import { useAtom } from "jotai";
import { flpAmt } from "../config/atoms";
import userData from "../assets/converted_file_new.json";
import { useChain } from '@cosmos-kit/react';
import starGazeList1 from "../assets/starGazeAddresses1.json";
import starGazeList2 from "../assets/starGazeAddresses2.json";
import eligibleEthAddresses from '../assets/ethEligibleWallets.json'
import { FaXTwitter } from "react-icons/fa6";
import KaitoCard from "../platforms/KaitoCard";
import BadKidsCard from "../platforms/BadKidsCard";
import Sloth from "../platforms/Sloth";
import { CardStepper } from "../Cards/Profile";

const Dashboard = ({ walletAddress, handleBackButtonClick }) => {
  const [showToast, setShowToast] = useState(false);

  const [showNewComponent, setShowNewComponent] = useState(false);

  const [twitterUserName, setTwitterUserName] = useState("");

  const [dataCards, setDataCards] = useState([]);
  const [isAnyDataAvailable, setIsAnyDataAvailable] = useState(false);

  const [mintingNft, setMintingNft] = useState(false);

  const [isAlreadyMinted, setIsAlreadyMinted] = useState(false);

  const [mintedNft, setMintedNft] = useState("");

  const [addressToMintTo, setAddressToMintTo] = useState("");


  useEffect(() => {
    const minted = localStorage.getItem("nftMinted");
    setIsAlreadyMinted(minted === "true");
  }, []);

  useEffect(() => {

    const isTwitterUserInList = userData.some(
      (user) => user.username === twitterUserName
    );

    const isInBadKids = starGazeList1.some(
      (user) => user.address.toLowerCase() === walletAddress.toLowerCase()
    );

    const isInSloth = starGazeList2.some(
      (user) => user.address.toLowerCase() === walletAddress.toLowerCase()
    );

    if (isTwitterUserInList || isInBadKids || isInSloth) {
      setIsAnyDataAvailable(true);
      return;
    }

    console.log("Data is available");
    setIsAnyDataAvailable(false);
  }, [walletAddress, twitterUserName, starGazeList1, starGazeList2, eligibleEthAddresses]);


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
  
  const handleTwitterDisconnect = () => {
    setTwitterUserName("");
    setIsAnyDataAvailable(false);
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

  const { connect, disconnect, isWalletConnected, address, status, error } = useChain('stargaze'); 


  const handleDisconnect = () => {
    console.log(status)
    console.log('disconn')
    disconnect()
    
    
  };

  console.log("isAnyDataAvailable", isAnyDataAvailable, walletAddress);

  const handleNFT = async () => {
    try {
      setMintingNft(true);

      const res = await mintNFT(addressToMintTo, address);  //  address to mint to

      // will mint to entered address & not connected wallet address
      console.log("resp", res?.onChain?.status);
      console.log(res)
      if (res.status = "200") {
        localStorage.setItem("nftMinted", "true");
        setIsAlreadyMinted(true);
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      }
    } catch (e) {
      console.error("Error minting NFT:", e);
    } finally {
      setMintingNft(false);
    }
  };

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
      },
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
  };

  useEffect(() => {
    getNFTMintedData();
  }, []);

  console.log(
    "Number(mintedNft) < 389",
    Number(mintedNft),
    Number(mintedNft) < 500
  );

  const twitterText = `Just minted my Filament Genesis NFT 

If you hold a bad kid or a celestine sloth,

Mint yours here: genesis.filament.finance`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterText
  )}`;

  const shareOnTwitter = async () => {
    try {
      window.open(tweetUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Twitter:", error);
    }
  };

  return (
    <div className="dashboard-container flex flex-col justify-between items-center z-50 w-full h-full">
      {showToast && <MintedToast />}

      {/* Persistent Back Button */}
      {/* {showNewComponent &&
       } */}

      {/* Main Content */}
      <div
        className={`data-container flex flex-col !h-full w-full ${showNewComponent ? "justify-center" : "justify-between pb-[40px]"
          } items-center`}
      >
        {!showNewComponent ? (
         
          <div className="screen-1 pt-[40px]">
            <div className="data-section flex-1 w-full flex-wrap mt-6">
              <BadKidsCard walletAddress={walletAddress} />
        
              <Sloth walletAddress={walletAddress} />
            </div>
            <br>
            </br>
            <div className="flex flex-col justify-center items-center z-50">
            <button
           className="back-btn press-start-2p-regular h-fit text-white text-[1.3em]"
           onClick={handleDisconnect}
         >
           <p>Disconnect</p>
         </button>
         </div>
          </div>
          
    
        ) : (
          <div className="badge-section w-full flex flex-col justify-between px-[103px]">
            <BadgeCard
              walletAddress={walletAddress}
             
              handleBackClick={handleBackClick}
            /> 
          
            {!isAlreadyMinted && mintedNft < 2000 && (
              <div className="flex justify-center gap-6">
                <button
                  className="back-btn press-start-2p-regular h-fit text-white text-[1.3em]"
                  onClick={handleBackClick}
                >
                  <p>Back</p>
                </button>
                <button
                  className={`${mintingNft ? "minting-btn" : "connect-btn"
                    } press-start-2p-regular h-fit max-w-[396px] text-[1.3em] flex-1`}
                  onClick={handleNFT}
                >
                  <span className="text-black">
                    {mintingNft ? "Minting..." : "Mint Now"}
                  </span>
                </button>
              </div>
            )}

            {isAlreadyMinted && mintedNft < 2000 && (
            <div>
              <div
                className="flex justify-center gap-6"
                onClick={shareOnTwitter}
              >
                <button className="connect-btn whitespace-nowrap press-start-2p-regular h-fit max-w-fit text-[1.3em] flex-1">
                  Share on X
                </button>
               
              </div>
              
             </div>
            )}

            {mintedNft >= 2000 && (
              <div className="flex justify-center items-center">
                <div className="text-white max-w-fit border border-[#595D74] bg-[#000000] bg-opacity-[50%] flex gap-[12px] items-center justify-center px-[24px] py-[20px] rounded-[9px]">
                  <img src="/warning.svg" className="w-[31px] h-[31px]" />
                  Phase 3 Minted Out
                </div>
              </div>
            )}
          </div>
        )}

        {!showNewComponent && isAnyDataAvailable ? (
          <div className="flex flex-col justify-center items-center gap-7">

            <div className="border w-[780px] border-white border-opacity-[20%] rounded-[6px] flex flex-col gap-2 bg-[#040E11] px-3 py-4">
              <span className="text-[#9CA3AF] text-[20px]">Mint to:</span>
              <input
                value={addressToMintTo}
                onChange={(e) => setAddressToMintTo(e.target.value)}
                placeholder="Enter an EVM Address"
                className=" bg-black h-12 bg-opacity-[40%] rounded-[8px] border border-[#9CA3AF] border-opacity-[20%] focus:outline-none text-white placeholder:text-[#9CA3AF] text-[16px] px-3 py-6"
              ></input>
            </div>


            <div className="w-full flex justify-center items-center">
              <button
                disabled={!addressToMintTo}
                className={`text-black press-start-2p-regular text-[1.3em] connect-btn w-fit 
                  ${!addressToMintTo
                    ? "connect-btn-disabled text-[#010104] text-opacity-[60%] hover:cursor-not-allowed"
                    : ""
                  }`}
                onClick={handleNextClick}
              >
                Mint Genesis
              </button>
            </div>


          </div>
        ) : !isAnyDataAvailable ? (
          <div className="text-white border border-[#595D74] bg-[#000000] bg-opacity-[50%] flex gap-[12px] items-center justify-center px-[24px] py-[20px] rounded-[9px]">
            <img src="/warning.svg" className="w-[31px] h-[31px]" />
            NOT ELIGIBLE TO MINT
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
