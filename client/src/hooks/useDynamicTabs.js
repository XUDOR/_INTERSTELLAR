//useDynamicTabs.js
import { useState } from 'react';

// Revised custom hook to manage dynamic tab labels, returning an object
function useDynamicTabs(initialLabels) {
  const [tabLabels, setTabLabels] = useState(initialLabels);

  // Function to update tab labels
  const updateTabLabels = (newLabels) => {
    console.log("Updating tab labels to:", newLabels);
    setTabLabels(newLabels);
  };

  // Return as an object to destructure conveniently
  return { tabLabels, updateTabLabels };
}

export default useDynamicTabs;
