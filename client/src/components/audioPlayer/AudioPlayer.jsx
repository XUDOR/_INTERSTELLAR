import React, { useContext, useEffect, useRef } from 'react';
import { PlaybackContext } from '../../Contexts/PlaybackContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const {
        currentTrackIndex,
        tracks,
        isPlaying,
        volume,
        currentTime,
        duration,
        autoplayEnabled,
        repeatMode,
        play,
        pause,
        seek,
        handleVolumeChange,
        playNext,
        toggleAutoplay,
        toggleRepeat
    } = useContext(PlaybackContext);

    const audioRef = useRef(null);

    // Play or pause the audio based on isPlaying
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle src, currentTime, and volume updates
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = tracks[currentTrackIndex]; // Ensure tracks[currentTrackIndex] is a valid URL
            audioRef.current.load();

            audioRef.current.currentTime = currentTime;
            audioRef.current.volume = volume;
        }
    }, [currentTrackIndex, currentTime, volume, tracks]);

    // Update time and duration from the audio element
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            seek(audio.currentTime);
        };

        const setDuration = () => {
            // Assuming your PlaybackContext has a method to update duration
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('durationchange', setDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('durationchange', setDuration);
        };
    }, [seek]);

    // Skip time for the 30-second forward and backward buttons
    const handleSkip = (time) => {
        if (audioRef.current) {
            const newTime = Math.min(Math.max(0, audioRef.current.currentTime + time), audioRef.current.duration);
            audioRef.current.currentTime = newTime;
            seek(newTime);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    return (
        <div className={`player ${isPlaying ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <audio ref={audioRef}></audio>
            <div className='TimeNameInfo'>
                <div className="audio-file-name">{tracks[currentTrackIndex] || "No song loaded"}</div>
                <div className="Time">{currentTime.toFixed(2)} / {duration.toFixed(2)}</div>
            </div>
            <div className='transport'>
                <button className="SkipBack" onClick={() => handleSkip(-30)}>Back 30s</button>
                <button className="Back" onClick={() => playNext(-1)}>Previous</button>
                <button className="Next" onClick={() => playNext(1)}>Next</button>
                <button className="SkipForward" onClick={() => handleSkip(30)}>Forward 30s</button>
                <button className="Repeat" onClick={toggleRepeat}>{repeatMode ? 'Disable Repeat' : 'Enable Repeat'}</button>
                <button className="Auto" onClick={toggleAutoplay}>{autoplayEnabled ? 'Disable Autoplay' : 'Enable Autoplay'}</button>
                <button className="Mute" onClick={() => handleVolumeChange(0)}>{volume > 0 ? 'Mute' : 'Unmute'}</button>
                <div className='VolumeSeekBox'>
                    <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => seek(parseFloat(e.target.value))} className="seek-slider" step=".05" />
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} className="volume-slider" />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
