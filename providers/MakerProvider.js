import React, { createContext, useState, useEffect } from 'react';
import Maker from '@makerdao/dai';
import mcdPlugin from '@makerdao/dai-plugin-mcd';

export const MakerObjectContext = createContext();

const createReadOnlyMaker = async () => {
  const maker = await Maker.create('http', {
    url: 'https://mainnet.infura.io/v3/58073b4a32df4105906c702f167b91d2',
    plugins: [mcdPlugin],
  });
  return maker;
};

function MakerProvider({ children, network = 'mainnet' }) {
  const [maker, setMaker] = useState(null);

  useEffect(() => {
    const loadMaker = async () => {
      const _maker = await createReadOnlyMaker(network);
      setMaker(_maker);
    };
    loadMaker();
  }, [network]);

  return (
    <MakerObjectContext.Provider
      value={{
        maker,
        network,
      }}
    >
      {children}
    </MakerObjectContext.Provider>
  );
}

export default MakerProvider;
