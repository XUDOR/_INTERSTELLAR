// /contexts/TabContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const TabContext = createContext();

// Custom hook to use the context
export const useTabs = () => {
    const context = useContext(TabContext);
    console.log("useTabs accessed, current context:", context);
    return context; // Return the context so it can be used by the component that called this hook
};

// Provider component
export const TabProvider = ({ children }) => {
    const [tabCount, setTabCount] = useState(3); // Default state for the count
    const [tabLabels, setTabLabels] = useState(['1', '2', '3']); // Default state for labels

    // Log state updates for debugging
    useEffect(() => {
      console.log("TabProvider updated tabCount:", tabCount);
      console.log("TabProvider updated tabLabels:", tabLabels);
    }, [tabCount, tabLabels]);

    // Value provided to consumers
    const value = { tabCount, setTabCount, tabLabels, setTabLabels };

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    );
};
