import create from 'zustand';

const useStore = create((set) => ({
  dsrRate: '0.00',
  totalSavingsDai: '0.00',

  activeModule: '',

  setDsrRate: (dsrRate) => {
    set({ dsrRate });
  },
  setTotalSavingsDai: (totalSavingsDai) => {
    set({ totalSavingsDai });
  },

  setActiveModule: (activeModule) => {
    set({ activeModule });
  },
}));

export default useStore;
