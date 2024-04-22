import React, { useContext, useEffect, useState } from 'react';
import { PlaybackContext } from '../../Contexts/PlaybackContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const {
        isPlaying,
        togglePlayback,
        currentTime,
        duration,
        setCurrentTime,
        skipTime,
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute,
        autoplayEnabled,
        toggleAutoplay,
        repeat,
        toggleRepeat,
        tracks,
        currentTrackIndex,
        setCurrentTrackIndex,
    } = useContext(PlaybackContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = tracks[currentTrackIndex];  // Adjust according to your tracks array
            audioRef.current.load();
            if (autoplayEnabled && isPlaying) {
                audioRef.current.play().catch((e) => console.log("Autoplay prevented by the browser"));
            }
        }
    }, [currentTrackIndex, tracks, autoplayEnabled, isPlaying]);

    useEffect(() => {
        const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
        const handleDurationChange = () => setDuration(audioRef.current.duration);

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('durationchange', handleDurationChange);

        return () => {
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.removeEventListener('durationchange', handleDurationChange);
        };
    }, []);

    const handleSkip = (seconds) => {
        const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={toggleExpand}></button>
            {isExpanded && (
                <div className='playerContainer'>
                    <audio ref={audioRef}></audio>
                    <div className='TimeNameInfo'>
                        <div className="audio-file-name">{tracks[currentTrackIndex] || "No song loaded"}</div>
                        <div className="Time">{currentTime.toFixed(2)} / {duration.toFixed(2)}</div>
                    </div>
                    <div className='transport'>
                        <button className="SkipBack" onClick={() => handleSkip(-30)}></button>
                        <button className="Back" onClick={() => setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length)}></button>
                        <button className="PlayStop" onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
                        <button className="Next" onClick={() => setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length)}></button>
                        <button className="SkipForward" onClick={() => handleSkip(30)}></button>
                        <button className='Repeat' onClick={toggleRepeat}>{repeat ? 'Disable Repeat' : 'Enable Repeat'}</button>
                        <button className="Auto" onClick={toggleAutoplay}>{autoplayEnabled ? 'Disable Autoplay' : 'Enable Autoplay'}</button>
                        <button className="Mute" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                        <div className='VolumeSeekBox'>
                            <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeekChange} onMouseDown={() => setCurrentTime(currentTime)} onMouseUp={() => setCurrentTime(currentTime)} className="seek-slider" step=".05" />
                            <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="volume-slider" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
