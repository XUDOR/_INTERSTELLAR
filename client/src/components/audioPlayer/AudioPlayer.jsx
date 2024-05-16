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
            
            audioPlayer.current.pause();
        } else {
            
            audioPlayer.current.play().catch(error => {
                console.error("Error during playback:", error);
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const skipTime = (time) => {
        if (!audioPlayer.current) return;
        const newTime = Math.max(0, Math.min(audioPlayer.current.currentTime + time, audioPlayer.current.duration));
        audioPlayer.current.currentTime = newTime;
    };

    const playNextSong = useCallback(() => {
        if (repeatMode === 2) {
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();
        } else {
            const nextIndex = (currentSongIndex + 1) % queue.length;
            if (repeatMode === 0 && currentSongIndex === queue.length - 1) {
                setIsPlaying(false);
            } else {
                setCurrentSongIndex(nextIndex);
                setIsPlaying(false);
            }
        }
    }, [currentSongIndex, queue.length, repeatMode, setCurrentSongIndex]);

    useEffect(() => {
        const player = audioPlayer.current;
        if (player) {
            player.src = currentSong.audio_url || '';
            player.load();

            const shouldPlay = isPlaying || autoplay;
            if (shouldPlay) {
                player.play().catch(error => {
                    console.error("Error playing the song:", error);
                    setIsPlaying(false);
                });
            } else {
                setIsPlaying(false);
            }
        }
    }, [currentSongIndex, currentSong.audio_url, autoplay]);

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
            if (e.keyCode === 32 && !['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName)) {
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

    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className='playToggle' onClick={() => setIsExpanded(!isExpanded)}></button>
            {isExpanded && (
                <>
                    <audio ref={audioPlayer}></audio>
                    <div className='playerContainer'>
                        <div className='TimeNameInfo'>
                            <div className="audio-file-name">{currentSong.name || "No song loaded"}</div>
                            <div className="Time">{calculateTime(currentTime)} / {calculateTime(duration)}</div>
                        </div>
                        <div className='transport'>
                            <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}></button>
                            <button className="SkipBack" onClick={() => skipTime(-30)}></button>
                            <button className="PlayStop" onClick={togglePlayback}>
                                {isPlaying ? <div className="stop-button"></div> : <div className="play-button"></div>}
                            </button>
                            <button className="SkipForward" onClick={() => skipTime(30)}></button>
                            <button className="Next" onClick={playNextSong}></button>
                            <button className="Repeat" onClick={() => setRepeatMode((repeatMode + 1) % 3)}>
                                {repeatMode === 0 ? "Off" : repeatMode === 1 ? "Queue" : "Song"}
                            </button>
                            <button className={`Auto ${autoplay ? 'AutoOn' : ''}`} onClick={() => setAutoplay(!autoplay)}>
                                List: {autoplay ? "On" : "Off"}
                            </button>
                        </div>
                        <div className='VolumeSeekBox'>
                            <div className="seek-control">
                                <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeekChange} onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)} className="seek-slider" step=".05" />
                            </div>
                            <div className="volume-control">
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