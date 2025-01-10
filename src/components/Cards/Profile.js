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
      const apiKey = process.env.REACT_APP_CROSSMINT_API_KEY;

    if (!apiKey) { 
        throw new Error("API key is missing");
    }
    
    const url = `/collections/${collectionId}/templates/${templateId}`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-api-key": apiKey,
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

  if (!badges || badges.length === 0) {
    return <div>No badges available</div>;
  }

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
        <div className="mt-[40px] flex gap-6">
          <span>{((Number(mintedNft)) / 500) * 100}%</span>
          <div className="w-full h-2 bg-white bg-opacity-[10%] mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#37F8FF] rounded-full transition-all duration-300"
              style={{
                width: `${((Number(mintedNft)) / 500) * 100}%`,
              }}
            ></div>
          </div>
          <span>{`${mintedNft}/500`}</span>
        </div>


        {/* Card Content */}
        <div className="flex-grow flex items-center justify-center relative mt-4">
          <div className="p-4  rounded-lg w-full max-w-[95%] md:max-w-[400px]">
            {currentCard.imageUrl && (
              <div className=" rounded-[19px]">
              <video  autoPlay
                  loop
                  controlsList="nodownload nofullscreen noplaybackrate"
                  disablePictureInPicture
                  muted
                  className=" pointer-events-none object-cover rounded-[19px] w-full h-full"
                  playsInline
                  width="600" controls>
                <source src="genesis-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              </div>
            )}

            {/* Button container */}
            {/* <div className="flex space-x-4 justify-start mt-3">
              <button
                className="text-white hover:text-emerald-400 transition"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCopyImage(currentCard.imageUrl);
                }}
              >
                <IoCopyOutline size={22} />
              </button>
              <button
                className="text-white hover:text-emerald-400 transition"
                onClick={(event) => {
                  event.stopPropagation();
                  downloadImage(currentCard.imageUrl, currentCard.name);
                }}
              >
                <MdDownload size={24} />
              </button>
            </div> */}
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
