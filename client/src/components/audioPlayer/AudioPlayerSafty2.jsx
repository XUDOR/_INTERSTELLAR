/* ---- >>>> audiplayer 2

import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat queue, 2: repeat one song
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(0.9);
    const audioPlayer = useRef(null);

    const currentSong = queue[currentSongIndex] || {};

    const togglePlayback = useCallback(() => {
        if (!audioPlayer.current) return;
    
        if (isPlaying) {
            console.log('Pausing playback');
            audioPlayer.current.pause();
            setIsPlaying(false);
        } else {
            console.log('Resuming playback');
            audioPlayer.current.play().catch(error => {
                console.error("Error during playback:", error);
            });
            setIsPlaying(true);
        }
    }, [isPlaying]);
    
    
    
    const playNextSong = useCallback(() => {
        if (repeatMode === 2) {
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();
        } else {
            let nextIndex = (currentSongIndex + 1) % queue.length;
            if (repeatMode === 0 && currentSongIndex === queue.length - 1) {
                setIsPlaying(false);
            } else {
                setCurrentSongIndex(nextIndex);
                setIsPlaying(false);
            }
        }
    }, [setCurrentSongIndex, currentSongIndex, queue.length, repeatMode]);

    useEffect(() => {
        const player = audioPlayer.current;
        if (player) {
            player.src = currentSong.audio_url || '';
            player.load();
    
            const shouldPlay = isPlaying || autoplay;
            if (shouldPlay) {
                player.play().catch(error => {
                    console.error("Error playing the song:", error);
                    setIsPlaying(false); // Ensure state is correct if an error occurs
                });
            } else {
                setIsPlaying(false);
            }
        }
    }, [currentSongIndex, currentSong.audio_url, isPlaying, autoplay]);
    

   

    useEffect(() => {
        const player = audioPlayer.current;
        if (!player) return;

        const updateProgress = () => {
            if (!isSeeking) setCurrentTime(player.currentTime);
        };

        const updateDuration = () => setDuration(player.duration);

        player.addEventListener('timeupdate', updateProgress);
        player.addEventListener('loadedmetadata', updateDuration);
        player.addEventListener('ended', playNextSong);

        return () => {
            player.removeEventListener('timeupdate', updateProgress);
            player.removeEventListener('loadedmetadata', updateDuration);
            player.removeEventListener('ended', playNextSong);
        };
    }, [playNextSong, isSeeking]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.keyCode === 32) { // Spacebar
                e.preventDefault();
                togglePlayback();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [togglePlayback]);

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioPlayer.current) {
            audioPlayer.current.volume = newVolume;
        }
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
// --->>> Render for PAGE
    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={() => setIsExpanded(!isExpanded)}></button>
            {isExpanded && (
                <>
                    <audio ref={audioPlayer}></audio>
                    <div className='TimeNameInfo'>
                        <div className="audio-file-name">{currentSong.name || "No song loaded"}</div>
                        <div className="Time">{calculateTime(currentTime)} / {calculateTime(duration)}</div>
                    </div>
                    <div className='transport'>
                        <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}></button>
                        <button className="PlayStop" onClick={togglePlayback}>
                            {isPlaying ? <div className="stop-button"></div> : <div className="play-button"></div>}
                        </button>
                        
                        <button className="Next" onClick={playNextSong}></button>
                        <button className="Repeat" onClick={() => setRepeatMode((repeatMode + 1) % 3)}>
                            {repeatMode === 0 ? "Off" : repeatMode === 1 ? "Queue" : "Song"}
                        </button>
                        <button className="Auto" onClick={() => setAutoplay(!autoplay)}>List: {autoplay ? "On" : "Off"}</button>
                    </div>

                    <div className='VolumeSeekBox'>
                        <div className="seek-control">
                            <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeekChange} onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)} className="seek-slider" step=".05" />
                        </div>
                        <div className="volume-control">
                            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AudioPlayer;
-----------

CSS

/* Base styles for the audio player 


.playToggle {
  position: relative; /* Change to absolute or fixed if needed 
  z-index: 10; /* Ensures it is above other elements 
  border: 1px solid #3AA0A0;
  width: 50px;
  height: 60px;
  justify-content: left;
  margin-right: 5px;
  background-image: url('../../images/Icons/player_forest.png');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s ease; /* Smooth transition for size changes 
}

.playToggle:hover {
  background-color: #065A82;


}

.player {
  display: flex;
  
  flex-direction: row;
  align-items: center;
  width: 8%; /* Maintains size but ensures everything fits 
  height: 110px;
  color: #F9F7E8;
  font-size: 14px; /* Slightly reduced for better aesthetics 
  padding: 10px 0;
  margin: auto;
  justify-content: flex-start; /* Aligns items to the start of the main-axis 
}

.player.collapsed {
  justify-content: flex-start; /* This ensures items are left-aligned when collapsed 
}



.TimeNameInfo{
  display: flex;
  flex-direction: row;
  flex: 20%;
}

/* Styles for the display of the audio file name 
.audio-file-name {
  display: flex;
  flex: .6;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px; /* Reduced height for more space efficiency 
  margin: 5px 1;
  padding: 2px;
  color: #0F1D38;
  font-size: 10px; /* Smaller font size for a sleeker look 
  border: 1px solid #3AA0A0;
  background: #3AA0A0;
}

/* Time display and seek bar 
.Time {
  display: flex;
  flex: .4;
  justify-content: center;
  align-items: center;
  width: 100%; /* Adjusted for better fit 
  height: 30px;
  border: 1px solid #3AA0A0;
  font-size: 11px;
  padding: 5px;
  margin: 5px;
}



/* Transport controls including previous, play/pause, and next buttons 
.transport {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 5px 5px;
}

.Back, .Next, .PlayStop {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #626154;
  color: #3AA0A0;
  width: 40px; /* Adjusted width for better control
  height: 40px;
  margin: 2px;
}

 .Resume {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #626154;
  color: #3AA0A0;
  width: 55px; /* Adjusted width for better control 
  height: 40px;
  margin: 2px;
}





.Back:hover, .Next:hover, .PlayStop:hover {
  background-color: #065A82;
}

/* Transform squares into triangle shapes using borders 
.Back {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 14px 24px 14px 0; /* Smaller triangles 
  border-color: transparent #2b7f8c transparent transparent; /* Right-pointing triangle 
}

.Next {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 14px 0 14px 24px; /* Smaller triangles 
  border-color: transparent transparent transparent #2b7f8c; /* Left-pointing triangle 
}



/* Specific styles for play and pause icons within buttons 
.play-button, .stop-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #96a508;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.stop-button {
  background-color: #2b7f8c;
  width: 20px; /* Ensures the pause icon is square 
  height: 20px; /* Square pause button 
  border-radius: 0%;
}

.Pause {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #626154;
  width: 40px;
  height: 40px;
  margin: 2px;
  color:#96a508
}

.Pause:hover {
  background-color: #065A82; /* Different hover color for visual feedback 
}




.Repeat {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  background-image: url('../../images/Icons/repeat_leaf.png');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: top;
  border: 1px solid #626154;
  color: #3AA0A0;
  
  width: 50px; /* Adjusted width for better control 
  height: 60px;
  margin-top: 20px;
  margin: 2px;
  padding-top: 40px;
}


.Auto {

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;      
  background-color: transparent;
  border: 1px solid #626154;
  color: #3AA0A0;
  width: 50px; /* Adjusted width for better control 
  height: 40px;
  margin: 2px;
}


/* Seek and Volume Controls 

.VolumeSeekBox{
  display: flex;
  flex-direction: row;
  
}
.seek-control, .volume-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  width: 100%;
  padding: 5px 0;
}

.seek-slider, .volume-slider {
  -webkit-appearance: none;
  width: 100%; /* Full width for better usability 
  height: 5px;
  background: #0F1D38;
  outline: none;
  opacity: 0.7;
  transition: opacity .3s;
  margin-bottom: 5px;
}

.seek-slider::-webkit-slider-thumb, .volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 5px;
  height: 45px;
  background: #96a508;
  cursor: pointer;
}

/* ________________________________________________________________ 

@media (min-width: 1025px) {
  .player {
    flex-direction: row; /* Ensures a horizontal layout for larger screens 
    justify-content: space-around; /* Evenly spaces out the player components 
    align-items: center;
    width: 70%;
  }

  .TimeNameInfo {
    flex: 1; /* Gives the time and name section a flexible space 
    display: flex;
    justify-content: space-between; /* Spreads the name and time 
    align-items: center;
    
  }

  .transport {
    flex: 0.5; /* Adjusts size to not stretch too much 
    justify-content: center; /* Centers the transport controls 
  }

  .VolumeSeekBox {
    flex: 1; /* Gives volume and seek controls a flexible space 
    display: flex;
    justify-content: space-between; /* Helps space out the controls 
    
  }

  .seek-control, .volume-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 5px;
    width: 100%;
    padding: 5px 0;
  }


}



/* ________________________________________________________________ 

@media (min-width: 769px) and (max-width: 1024px) {
  .player {
    flex-direction: column; /* Ensures a horizontal layout for larger screens 
    flex: .9;
    justify-content: center; /* Evenly spaces out the player components 
    align-items: center;
    width: 60%;
  }

  .TimeNameInfo {
     /* Gives the time and name section a flexible space 
    display: flex;
    flex-direction: column;
    flex: .6;
    justify-content: space-between; /* Spreads the name and time 
    align-items: center;
    
  }

  .transport {
    flex: 0.5; /* Adjusts size to not stretch too much 
    justify-content: center; /* Centers the transport controls
  }

  .VolumeSeekBox {
    
    display: flex;
    flex-direction: column;
    flex: .8; 
  
  }
  .seek-slider::-webkit-slider-thumb, .volume-slider::-webkit-slider-thumb {
    width: 8px;
    height: 20px;
    margin-bottom: 5px;

  }
}




 ________________________________________________________________ 

@media (min-width: 480px) and (max-width: 768px) {
  .player {
    display: flex;
    flex-direction: column; 
    flex-wrap: wrap;
    justify-content: left; 
    align-items: center;
  }
  .TimeNameInfo {
    flex: 1; /
    display: flex;
    flex-direction: column;
    width: 70%;
    justify-content: left; 
    align-items: center;
  }

  .transport {
    flex: 0.7; /
    justify-content: center; 
  }

  .VolumeSeekBox {
    flex: 2; 
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
  
  }
  .seek-slider::-webkit-slider-thumb, .volume-slider::-webkit-slider-thumb {
    width: 8px;
    height: 20px;
    margin-bottom: 3px;

  }
  
}
@media (min-width: 290px) and (max-width: 480px) {
  .player {
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    padding: 10px; 
    width: 100%;
    height: auto;
    padding-bottom: 120px;
  }

  .player.expanded {
    background-color: #0F1D38;
    min-height: 300px; 
    height: auto; 
    padding: 15px; 
  }

  .VolumeSeekBox {
    width: 100%; 
    margin-top: 10px; 
    margin-bottom: 10px; 
    width: 100%;
    flex-direction: column; 
  }



  .TimeNameInfo {
    width: 100%; 
    margin-top: 10px; 
    margin-bottom: 10px; 
    flex-direction: column; 
  }

   .transport  {
    width: 100%; 
    margin-top: 10px; 
    margin-bottom: 10px; 
    flex-direction: row; 
  }



  .seek-slider, .volume-slider {
    width: 90%; 
    margin: 0 auto; 
  }

  .seek-slider::-webkit-slider-thumb, .volume-slider::-webkit-slider-thumb {
    height: 20px; 
    width: 8px;  
  }
}
*/