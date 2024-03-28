import React, { createContext, useContext, useEffect } from 'react';
import usePersistentState from '../hooks/usePersistentState'; // Adjust the path as necessary

const TabContext = createContext();

export const useTabs = () => {
  const context = useContext(TabContext);
  // Adding log here to observe whenever useTabs hook is accessed
  console.log("useTabs accessed, current context:", context);
  return context;
};

export const TabProvider = ({ children }) => {
  const [tabLabels, setTabLabels] = usePersistentState('tabLabels', ['1', '2', '3']);
  const [adminModified, setAdminModified] = usePersistentState('adminModified', false);

  useEffect(() => {
    // Log when useEffect runs to check conditions about the "Album" label
    console.log(`Effect running: adminModified=${adminModified}, first label is currently '${tabLabels[0]}'`);
    if (adminModified && tabLabels.length && tabLabels[0] !== 'Album') {
      console.log("Correcting first label to 'Album'");
      setTabLabels(['Album', ...tabLabels.slice(1)]);
    }
  }, [adminModified, tabLabels, setTabLabels]);

  // Logging state updates for debugging
  useEffect(() => {
    console.log("Global tabLabels updated:", tabLabels);
    console.log("Global adminModified updated:", adminModified);
  }, [tabLabels, adminModified]);

  const value = { tabLabels, setTabLabels, adminModified, setAdminModified };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
