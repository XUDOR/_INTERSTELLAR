//usePersistentState.js
import { useState, useEffect } from 'react';

// A hook to manage state that's backed by localStorage for persistence
function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  // Whenever the state changes, update localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
  