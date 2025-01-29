import { copyImageToClipboard } from "copy-image-clipboard";
import React, { useEffect, useState } from "react";
import { CardStepper } from "./Profile";
import hello2Image from "../assets/hlLoyal.png";
import explorer from "../assets/explorer.png";
import tenMil from "../assets/10mVol.png";
import fiveMil from "../assets/5mVol.png";
import oneMilVol from "../assets/1milVol.png";
import dydx from "../assets/dydx.png";
import tenkPnL from "../assets/10kPnL.png";
import hundredkPnL from "../assets/100kPnL.png";
import fiftykPnL from "../assets/50kPnL.png";
import fiveHPnL from "../assets/500kPnL1.png";
import oneMilPnL from "../assets/1milPnL.png";
import newbie from "../assets/newbie.png";
import { FaXTwitter } from "react-icons/fa6";
import mintNFT from "../mintNFT";

const BadgeCard = ({ walletAddress, summaryData, handleBackClick }) => {
  const [copied, setCopied] = useState(false);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

 


  const handleTweet = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=Just%20checked%20out%20my%20journey%20with%20perpetuals%20so%20far%20on%20Filament%20Wrapped%20%F0%9F%93%88%20%20check%20yours%20here%3A%20wrapped.filament.finance`;
    window.open(tweetUrl, "_blank");
  };
  
  const handleNFT = async() => {
    try {
      const res = await mintNFT(walletAddress)
    } catch (e) {
      console.error("Error minting NFT:", e);
    }
  }

  const downloadImage = async (imageSrc, imageName) => {
    try {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };



  return (
    <div className="flex flex-col items-center rounded-xl  overflow-auto ">
      <div className="relative card flex flex-col items-center w-full overflow-hidden">
        <img src="/square.svg" className="absolute z-10 w-full h-auto overflow-hidden"></img>
         
          <CardStepper
            badges={badges}
            walletAddress={walletAddress}
          />
      
      </div>

      {/* <div className="flex justify-center mt-4 gap-6 items-center w-full flex-wrap">
        <button
          className="p-4 text-white font-semibold rounded-2xl bg-teal-900 backdrop-blur-[30px] w-60 flex justify-center items-center gap-2"
          onClick={handleNFT}
        >
          Mint NFT
        </button> 
      </div> */}

      {copied && (
        <div className="mt-4 text-green-500 text-center">
          <p>Copied to clipboard!</p>
        </div>
      )}
    </div>
  );  
};

export default BadgeCard;
