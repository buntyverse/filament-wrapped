import React, { useEffect } from "react";
import { useChain } from '@cosmos-kit/react';




const WrappedCircle = ({ walletAddress, setWalletAddress, fetchData }) => {


  const { connect, disconnect, isWalletConnected, address, status, error, openView } = useChain('stargaze'); 

  // const address = '0xBf7Ac59948Fb15A24Fe9a97699294b3F7b7f1300'

  useEffect(() => {

    if (address) {
      console.log(address)
      setWalletAddress(address); 
      fetchData();
    }

  }, [address]);

  return (
    
    <div className=" flex flex-col justify-center items-center z-50 ">
      
      <img src="/genesis.svg" className="w-[670px] h-auto" />
      <p className="text-center press-start-2p-regular mt-[17px] font-semibold text-white text-[14px] leading-[20px] px-6 capitalize tracking-wide">
        Press Start
      </p>
      {/* <div className="bg-white bg-opacity-[3%] border w-[349px] border-white border-opacity-[5%] py-1 px-3 rounded-[6px] flex">
        <input
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="bg-transparent flex-1 focus:outline-none text-[16px]"
          placeholder="Enter Address"
        ></input>
        <button
          onClick={fetchData}
          className="w-[38px] h-[34px] p-3 rounded-[4px] bg-[#2ACCBB] flex justify-center items-center"
        >
          <img src="/RightArrow.svg" className="w-[14px] h-[14px]"></img>
        </button>
      </div> */}
        <button className="connect-btn mt-[144px] !px-[100px] press-start-2p-regular text-black text-[1.3em]" onClick={connect} type="button">
                      Start
                    </button>

      
                  
               
              
    </div>
  );
};

export default WrappedCircle;
