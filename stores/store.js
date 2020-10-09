import create from 'zustand';

const useStore = create((set) => ({
  dsrRate: '0.00',
  totalSavingsDai: '0.00',

  setDsrRate: (dsrRate) => {
    set({ dsrRate });
  },
  setTotalSavingsDai: (totalSavingsDai) => {
    set({ totalSavingsDai });
  },
}));

export default useStore;
