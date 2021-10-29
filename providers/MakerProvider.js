import React, { createContext, useState, useEffect } from 'react';
import shallow from 'zustand/shallow';
import Maker from '@makerdao/dai';
import mcdPlugin from '@makerdao/dai-plugin-mcd';
import useStore from '../stores/store';

export const MakerObjectContext = createContext();

const createReadOnlyMaker = async () => {
  const maker = await Maker.create('http', {
    url: 'https://mainnet.infura.io/v3/1808ee2f15ff4d60b333a4327cab39ff',
    plugins: [mcdPlugin],
  });
  return maker;
};

function MakerProvider({ children, network = 'mainnet' }) {
  const [maker, setMaker] = useState(null);

  const [setDsrRate, setTotalSavingsDai] = useStore(
    (state) => [state.setDsrRate, state.setTotalSavingsDai],
    shallow
  );

  // Create Maker object
  useEffect(() => {
    const loadMaker = async () => {
      const _maker = await createReadOnlyMaker(network);
      setMaker(_maker);
    };
    loadMaker();
  }, [network]);

  // Fetch DSR Data
  useEffect(() => {
    if (!maker) return;
    const getDsr = async () => {
      const rate = await maker.service('mcd:savings').getYearlyRate();
      setDsrRate(rate.toFormat(2));
    };
    const getTotalDai = async () => {
      const total = await maker.service('mcd:savings').getTotalDai();
      setTotalSavingsDai(total._amount.toFormat(2));
    };
    getDsr();
    getTotalDai();
  }, [maker, setDsrRate, setTotalSavingsDai]);

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
