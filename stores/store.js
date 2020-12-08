import create from 'zustand';

const useStore = create((set) => ({
  dsrRate: '0.00',
  totalSavingsDai: '0.00',

  activeGroup: '',

  setDsrRate: (dsrRate) => {
    set({ dsrRate });
  },
  setTotalSavingsDai: (totalSavingsDai) => {
    set({ totalSavingsDai });
  },

  setActiveGroup: (activeGroup) => {
    set({ activeGroup });
  },
}));

export default useStore;
