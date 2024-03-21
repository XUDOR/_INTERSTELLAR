// App.jsx
import React from 'react';
import Header from './components/Header/Header'; // Assuming Header is properly set up
import GalleryDisplay from './components/Gallery/Gallery_Display';
// Assuming you'll create and import Footer later
import Footer from './components/Footer/Footer'
import './App.css'; // Make sure to have global styles that apply to the entire app

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <GalleryDisplay />
        {/* Place other components here as your app grows */}
      </main>
      {/* Footer will eventually go here */}
       <Footer /> 
    </div>
  );
}

export default App;
