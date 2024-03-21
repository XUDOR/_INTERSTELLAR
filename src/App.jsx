import React from 'react';
import Tabs from './components/Tabs/Tabs';
import TabPanel from './components/Tabs/TabPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Tabs>
        <TabPanel label="Tab 1">
          Content for Tab 1
        </TabPanel>
        <TabPanel label="Tab 2">
          Content for Tab 2
        </TabPanel>
        <TabPanel label="Tab 3">
          Content for Tab 3
        </TabPanel>

      </Tabs>
    </div>
  );
}


export default App;