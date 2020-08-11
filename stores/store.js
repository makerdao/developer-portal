import create from 'zustand';

const [useResourceStore] = create((set, get) => ({
  resources: [],

  setResources: list => {
    set({ resources: list });
  },
}));

export default useResourceStore;
