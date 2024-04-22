import React, { useContext, useEffect, useState, useRef } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import { useAudioControl } from '../../hooks/useAudioControl';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { useVolumeControl } from '../../hooks/useVolumeControl';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);
    const { isPlaying, togglePlayback, audioRef, play, pause } = useAudioControl();
    const { currentTime, duration, setCurrentTime, setIsSeeking, skipTime } = useTrackProgress(audioRef);
    const { volume, handleVolumeChange } = useVolumeControl(audioRef);
    const [isExpanded, setIsExpanded] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true); // State to handle autoplay
    const [repeat, setRepeat] = useState('off'); // Repeat can be 'off', 'all', or 'one'

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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

    useEffect(() => {
        if (audioRef.current && queue.length > 0) {
            audioRef.current.src = queue[currentSongIndex]?.audio_url || '';
            audioRef.current.load();
            if (autoPlay) {
                audioRef.current.play().catch((e) => console.log("Autoplay prevented by the browser"));
            }
        }
    }, [currentSongIndex, queue, audioRef, autoPlay]);

    useEffect(() => {
        const audio = audioRef.current;
        const handleSongEnd = () => {
            if (repeat === 'one') {
                audio.currentTime = 0;
                play();
            } else if (repeat === 'all' || autoPlay) {
                setCurrentSongIndex((currentSongIndex + 1) % queue.length);
            }
        };

        if (audio) {
            audio.addEventListener('ended', handleSongEnd);
            return () => audio.removeEventListener('ended', handleSongEnd);
        }
    }, [currentSongIndex, queue.length, repeat, autoPlay, play, setCurrentSongIndex, audioRef]);

    

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleRepeat = () => {
        setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off');
    };

    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={toggleExpand}></button>
            {isExpanded && (
                <div className='playerContainer'>
                    <audio ref={audioRef}></audio>
                    <div className='TimeNameInfo'>
                        <div className="audio-file-name">{queue[currentSongIndex]?.name || "No song loaded"}</div>
                        <div className="Time">{calculateTime(currentTime)} / {calculateTime(duration)}</div>
                    </div>
                    <div className='transport'>
                        <button className="SkipBack" onClick={() => handleSkip(-30)}></button>
                        <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}></button>
                        <button className="PlayStop" onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
                        <button className="Next" onClick={() => setCurrentSongIndex((currentSongIndex + 1) % queue.length)}></button>
                        
                        <button className="SkipForward" onClick={() => handleSkip(30)}></button>
                        <button className='Repeat' onClick={toggleRepeat}> {repeat}</button>
                        <div className='VolumeSeekBox'>
                            <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeekChange} onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)} className="seek-slider" step=".05" />
                            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
