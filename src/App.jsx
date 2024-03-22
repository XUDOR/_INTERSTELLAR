// App.jsx
import React from 'react';
import Header from './components/Header/Header'; 
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer'
import './App.css'; 

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Main />
        
      </main>
       <Footer /> 
    </div>
  );
}

export default App;
