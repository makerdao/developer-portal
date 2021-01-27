import create from 'zustand';

const useStore = create((set) => ({
  dsrRate: '0.00',
  totalSavingsDai: '0.00',

  activeGroup: '',
  activeParent: '',

  setDsrRate: (dsrRate) => {
    set({ dsrRate });
  },
  setTotalSavingsDai: (totalSavingsDai) => {
    set({ totalSavingsDai });
  },

  setActiveGroup: (activeGroup) => {
    set({ activeGroup });
  },
  setActiveParent: (activeParent) => {
    set({ activeParent });
  },
}));

export default useStore;
