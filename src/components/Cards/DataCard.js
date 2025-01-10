import React, { useState } from "react";

const DataCard = ({ loading, totalVolume, pnl, tradedAssets, imgSrc }) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left; // X coordinate relative to the card
    const y = e.clientY - rect.top; // Y coordinate relative to the card

    const tiltX = (y / rect.height - 0.5) * 20; // Vertical tilt
    const tiltY = (x / rect.width - 0.5) * -20; // Horizontal tilt

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  console.log(tradedAssets);

  // If totalVolume is 0, display "No Data Found" for the entire card
  if (totalVolume === 0) {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`cardMoprh px-6 py-8 h-min flex flex-col items-center gap-6 bg-gray-800 rounded-lg shadow-lg`}
        style={tiltStyle}
      >
      
          <img
            className="h-[31px] w-auto"
            src={imgSrc}
            alt="Asset"
          />
    
        <div className="w-full h-full flex justify-center ">
          <p className="text-center text-gray-200 sm:text-sm ">No Data Found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${Number(totalVolume) > 0 ? 'border !border-[#37F8FF] !border-opacity-[40%]' : ''} cursor-pointer cardMoprh px-[77px] py-8 flex flex-col justify-center items-center gap-6 bg-gray-800 rounded-lg shadow-lg`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      <img className="h-[31px] w-auto mx-auto" src={imgSrc} alt="Asset" />
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[24px] text-[#595D74]">
              Total Volume
            </span>
            <p className="text-[24px] text-white press-start-2p-regular">
              {totalVolume?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          {pnl ? <div className="flex flex-col items-center">
            <span className="text-[24px] text-[#595D74]">
              Total PnL:
            </span>
            <p className="text-[24px] text-white press-start-2p-regular">
              {pnl?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div> : null}
          {tradedAssets.length !== 0 && (
            <div className="flex flex-col items-center">
              <span className="text-[24px] text-[#595D74]">
                Assets Traded
              </span>
              <p className="text-[16px] text-white ">
                {tradedAssets.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataCard;
