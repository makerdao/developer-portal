import React, { createContext, useState, useEffect } from 'react';
import { instantiateMaker } from '../maker';

export const MakerObjectContext = createContext();

function MakerProvider({ children, network = 'mainnet' }) {
  const [maker, setMaker] = useState(null);
  const [web3Connected, setWeb3Connected] = useState(null);

  const connectBrowserWallet = async () => {
    try {
      if (maker) {
        await maker.authenticate();
        const { networkName } = maker.service('web3');
        if (network !== networkName) {
          return window.alert(
            `Wrong network. Your provider is connected to ${networkName}`
          );
        }

        setWeb3Connected(true);
      }
    } catch (err) {
      console.error(err);
      window.alert(
        'There was a problem connecting to your wallet, please reload and try again.'
      );
    }
  };

  useEffect(() => {
    const loadMaker = async () => {
      const _maker = await instantiateMaker(network);
      setMaker(_maker);
    };
    loadMaker();
  }, [network]);

  const fetchTokenBalance = token => {
    return maker.service('token').getToken(token).balance();
  };

  return (
    <MakerObjectContext.Provider
      value={{
        maker,
        network,
        web3Connected,
        connectBrowserWallet,
        fetchTokenBalance,
      }}
    >
      {children}
    </MakerObjectContext.Provider>
  );
}

export default MakerProvider;
