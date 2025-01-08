import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const WrappedCircle = ({ walletAddress, setWalletAddress, fetchData }) => {

  const {address} = useAccount();

  // const address = '0xBf7Ac59948Fb15A24Fe9a97699294b3F7b7f1300'

  useEffect(() => {
    if (address) {
      setWalletAddress(address); 
      fetchData();
    }
  }, [address]);

  return (
    <div className="w-[634px] h-[634px] rounded-full gap-[60px] border-[5px] border-[#40E0D0] bg-[#0B1216] flex flex-col justify-center items-center border-opacity-[30%]">
      <img src="/Logo.svg" className="w-[230px] h-auto" />
      <img src="/Wrapped.svg" className="w-[444px] h-auto" />
      <p className="text-center font-semibold text-white text-[14px] leading-[20px] px-6 opacity-60 capitalize tracking-wide">
        Connect/enter your wallet to find a summary of your trading activity and mint the Genesis NFT
        <br></br>
        <br></br>
        Supported exchanges: Hyperliquid, DYDX, and Vertex
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
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
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
                    </button>
  
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WrappedCircle;
