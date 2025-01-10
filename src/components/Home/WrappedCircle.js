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
                    <button className="connect-btn mt-[144px] press-start-2p-regular text-black text-[32px]" onClick={openConnectModal} type="button">
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
