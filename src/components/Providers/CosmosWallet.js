import React from 'react';
import { useChain } from '@cosmos-kit/react';
 // Optional: Using Chakra UI for styling

const WalletPopup = () => {
  const { connect, disconnect, isWalletConnected, address, status, error } = useChain('stargaze');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Display wallet connection status */}
      {isWalletConnected ? (
        <>
          <p>Connected to Stargaze!</p>
          <p>Address: {address}</p>
          <button colorScheme="red" onClick={disconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <p>Please connect your Stargaze wallet:</p>
          <button colorScheme="blue" onClick={connect}>
            Connect Wallet
          </button>
        </>
      )}

      {/* Optional: Show connection status or error */}
      {status && <p>Status: {status}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default WalletPopup;
