import React, { useContext, useEffect, useState } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import { useAudioControl } from '../../hooks/useAudioControl';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { useVolumeControl } from '../../hooks/useVolumeControl';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);
    const { isPlaying, togglePlayback, audioRef, play, pause } = useAudioControl(false);
    const { currentTime, duration, setCurrentTime, setIsSeeking, skipTime } = useTrackProgress(audioRef);
    const { volume, handleVolumeChange } = useVolumeControl(audioRef);
    const [isExpanded, setIsExpanded] = useState(false);

    // Initial song setup and autoplay handling
    useEffect(() => {
        console.log("Current Song Index:", currentSongIndex); // Logging the current index for debugging
        if (audioRef.current && queue.length > 0) {
            audioRef.current.src = queue[currentSongIndex]?.audio_url || '';
            audioRef.current.load();
        }
    }, [currentSongIndex, queue, audioRef]);

    // Handling space bar to toggle playback
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space' && event.target === document.body) {
                event.preventDefault();
                togglePlayback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [togglePlayback]);

    // Skip 30 seconds forward or backward
    const handleSkip = (seconds) => {
        skipTime(seconds);
    };

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={() => setIsExpanded(!isExpanded)}></button>
            {isExpanded && (
                <>
                    <audio ref={audioRef}></audio>
                    <div className='playerContainer'>
                        <div className='TimeNameInfo'>
                            <div className="audio-file-name">{queue[currentSongIndex]?.name || "No song loaded"}</div>
                            <div className="Time">{calculateTime(currentTime)} / {calculateTime(duration)}</div>
                        </div>
                        <div className='transport'>
                            <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}></button>
                            <button className="PlayStop" onClick={togglePlayback}>
                                <div className={isPlaying ? "stop-button" : "play-button"}></div>
                            </button>
                            <button className="Next" onClick={() => setCurrentSongIndex((currentSongIndex + 1) % queue.length)}></button>
                            <button className="SkipBack" onClick={() => handleSkip(-30)}></button>
                            <button className="SkipForward" onClick={() => handleSkip(30)}></button>
                            <div className='VolumeSeekBox'>
                                <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeekChange} onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)} className="seek-slider" step=".05" />
                                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AudioPlayer;
