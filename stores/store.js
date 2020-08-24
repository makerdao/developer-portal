import create from 'zustand';

const [useResourceStore] = create((set, get) => ({
  resources: [],
  guides: [],

  setResources: list => {
    set({ resources: list });
  },

  setGuidesByTag: tag => {
    const guides = get().resources.filter(x => {
      return x.frontMatter?.tags?.includes(tag);
    });
    set({ guides });
  },
}));

export default useResourceStore;
