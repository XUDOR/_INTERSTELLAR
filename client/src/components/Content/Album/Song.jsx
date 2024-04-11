// Song.jsx
import React from 'react';
import './Song.css'
import play from "../../../images/Icons/Play.png"

// Adjusting the Song component to match your data structure
function Song({ song, setaudioFIleName }) {
  console.log("Rendering song:", song);

const handleClickPlay = (songToPlay) => {
  console.log("PLay-clicked",songToPlay);
setaudioFIleName(songToPlay.audio_url)
}



  return (
    <div className='Song'>
      
      {/* Assuming `name` is the correct property based on your state log */}
      <div>{song.name}</div>
      {/* Display more song details here */}
    
      <div onClick={()=>handleClickPlay(song)}>
        <img src={play} alt="play" />  
        </div>
    </div>
  );
}


export default Song;
