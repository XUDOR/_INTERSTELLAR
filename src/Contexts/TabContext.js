// /Contexts/TabContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context
const TabContext = createContext();

// Custom hook to use the context
export const useTabs = () => useContext(TabContext);

// Provider component
export const TabProvider = ({ children }) => {
    const [tabCount, setTabCount] = useState(3); // Default state

    // Value provided to consumers
    const value = { tabCount, setTabCount };

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    );
};
