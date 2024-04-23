import React, { useContext, useRef, useEffect } from 'react';
import { PlaybackContext } from '../../Contexts/PlaybackContext';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { useVolumeControl } from '../../hooks/useVolumeControl'; // Import the hook
import './AudioPlayer.css';

const AudioPlayer = () => {
    const {
        currentTrackIndex,
        tracks,
        isPlaying,
        play,
        pause,
        seek,
        playNext,
        toggleAutoplay,
        toggleRepeat
    } = useContext(PlaybackContext);

    const { currentTime, duration, setCurrentTime } = useTrackProgress();
    const audioRef = useRef(null);
    const { volume, handleVolumeChange, toggleMute, isMuted } = useVolumeControl(audioRef); // Use the hook

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = tracks[currentTrackIndex]?.audio_url || '';
            audioRef.current.load();
            setCurrentTime(0);  // Reset time
        }
    }, [currentTrackIndex, tracks, setCurrentTime]);

    return (
        <div className={`player ${isPlaying ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={() => isPlaying ? pause() : play()}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <audio ref={audioRef} onLoadedMetadata={() => setCurrentTime(audioRef.current.currentTime)} onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)} />
            <div className='TimeNameInfo'>
                <div className="audio-file-name">{tracks[currentTrackIndex]?.name || "No song loaded"}</div>
                <div className="Time">{currentTime.toFixed(2)} / {duration.toFixed(2)}</div>
            </div>
            <div className='transport'>
                <button className="SkipBack" onClick={() => seek(-30)}>Back 30s</button>
                <button className="Back" onClick={() => playNext(-1)}>Previous</button>
                <button className="Next" onClick={() => playNext(1)}>Next</button>
                <button className="SkipForward" onClick={() => seek(30)}>Forward 30s</button>
                <button className="Repeat" onClick={toggleRepeat}>Repeat</button>
                <button className="Auto" onClick={toggleAutoplay}>Autoplay</button>
                <button className="Mute" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                <div className='VolumeSeekBox'>
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => handleVolumeChange(e.target.value)} className="volume-slider" />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
