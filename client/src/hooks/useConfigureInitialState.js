// useConfigureInitialState.js

import { useContext, useEffect } from 'react';
import { useMusicData } from '../Contexts/MusicDataContext';

const useConfigureInitialState = (config) => {
  const { setActiveTab } = useMusicData();

  useEffect(() => {
    // Imagine `config` contains some criteria for setting the initial active tab
    if (config.userPreference) {
      setActiveTab(config.userPreference);
    }
    // Extend with more conditions as needed
  }, [config, setActiveTab]);
};

export default useConfigureInitialState;
