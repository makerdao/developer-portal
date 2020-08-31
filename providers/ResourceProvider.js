import { createContext } from 'react';

export const ResourceContext = createContext();

function ResourceProvider({ children, resources }) {
  return (
    <ResourceContext.Provider value={resources}>
      {children}
    </ResourceContext.Provider>
  );
}

export default ResourceProvider;
