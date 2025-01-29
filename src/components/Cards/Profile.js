import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { FaRegClipboard } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

export const CardStepper = ({ badges, walletAddress, handleCopyImage, downloadImage }) => {

  const [mintedNft, setMintedNft] = useState("");
  
  const collectionId = process.env.REACT_APP_COLLECTION_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

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
    getNFTMintedData()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNextCard();
      } else if (event.key === "ArrowLeft") {
        handlePreviousCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) {
      return;
    }

    const touchCurrentX = e.touches[0].clientX;
    const diffX = touchStartX - touchCurrentX;

    if (diffX > 50) {
      handleNextCard();
      setTouchStartX(null);
    } else if (diffX < -50) {
      handlePreviousCard();
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < badges.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

 

  const currentCard = badges[currentCardIndex];



  return (
    <div className="flex flex-col z-40 items-center justify-center  text-white shadow-white">
      <div
        className="w-full max-w-[400px] flex flex-col relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress Bar */}
        <div className="mt-[24px] flex flex-col gap-2">
          <div className="flex w-full justify-between text-[32px]">
            <span>{((mintedNft / 2000) * 100).toFixed(2)}%</span>
            <span>{`${mintedNft}/2000`}</span>
          </div>
          <div className="w-full h-2 bg-white bg-opacity-[10%] mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#37F8FF] rounded-full transition-all duration-300"
              style={{
                width: `${((Number(mintedNft)) / 2000) * 100}%`,
              }}
            ></div>
          </div>
          
        </div>


        {/* Card Content */}
        <div className="flex-grow flex items-center justify-center relative mt-4">
          <div className="rounded-lg w-full max-w-[95%] md:max-w-[400px]">
          
              <div className=" rounded-[19px]">
                <img src="/genesis.gif"></img>
              </div>
          
          </div>
        </div>
      </div>

      {/* Previous/Next Buttons */}
      {/* <div className="absolute inset-0 flex z-0 h-1/3 lg:h-2/5 top-32"> */}
        {/* Left arrow button */}
        {/* <div
          className="w-1/2 cursor-pointer z-1 flex items-center justify-start pl-4"
          onClick={handlePreviousCard}
        >
          <button
            className={`${
              currentCardIndex === 0 ? "opacity-50 pointer-events-none" : ""
            } text-white bg-black p-2 rounded-full`}
            onClick={handlePreviousCard}
          >
            <FaChevronLeft size={24} />
          </button>
        </div> */}

        {/* Right arrow button */}
        {/* <div
          className="w-1/2 cursor-pointer z-1 flex items-center justify-end pr-4"
          onClick={handleNextCard}
        >
          <button
            className={`${
              currentCardIndex === badges.length - 1
                ? "opacity-50 pointer-events-none"
                : ""
            } text-white bg-black p-2 rounded-full`}
            onClick={handleNextCard}
          >
            <FaChevronRight size={24} />
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
};
