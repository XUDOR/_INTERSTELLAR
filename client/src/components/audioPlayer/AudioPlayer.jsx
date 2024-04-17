import React, { useEffect, useState, useRef, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import { ReactComponent as NextIcon } from '../../images/Icons/next-gray.svg';
import { ReactComponent as PreviousIcon } from '../../images/Icons/back-gray.svg';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(0.9);
    const audioPlayer = useRef(null);

    const currentSong = queue[currentSongIndex] || {};

    useEffect(() => {
        const player = audioPlayer.current;
        if (player && currentSong.audio_url) {
            player.src = currentSong.audio_url;
            player.load();
            if (isPlaying) {
                player.play().catch(e => console.error("Error auto-playing the song:", e));
            }
        }
    }, [currentSongIndex, currentSong.audio_url, isPlaying]);

    useEffect(() => {
        const player = audioPlayer.current;
        if (player) {
            const updateProgress = () => {
                setCurrentTime(player.currentTime);
            };
            const updateDuration = () => {
                setDuration(player.duration);
            };
            const playNextSong = () => {
                const nextIndex = (currentSongIndex + 1) % queue.length;
                setCurrentSongIndex(nextIndex);
                setIsPlaying(true);
            };

            player.addEventListener('timeupdate', updateProgress);
            player.addEventListener('loadedmetadata', updateDuration);
            player.addEventListener('ended', playNextSong);

            return () => {
                player.removeEventListener('timeupdate', updateProgress);
                player.removeEventListener('loadedmetadata', updateDuration);
                player.removeEventListener('ended', playNextSong);
            };
        }
    }, [currentSongIndex, queue.length]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.keyCode === 32) { // Spacebar
                e.preventDefault(); // Stop the page from scrolling
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const togglePlayPause = () => {
        setIsPlaying(prevIsPlaying => {
            if (!prevIsPlaying && audioPlayer.current) {
                audioPlayer.current.play().catch(error => {
                    console.error("Error playing the song:", error);
                    return false;
                });
            } else if (audioPlayer.current) {
                audioPlayer.current.pause();
            }
            return !prevIsPlaying;
        });
    };

    const handleSeekChange = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        if (audioPlayer.current) {
            audioPlayer.current.volume = newVolume;
            setVolume(newVolume);
        }
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="player">
            <audio ref={audioPlayer}></audio>
            <div className="audio-file-name">{currentSong.name || "No song loaded"}</div>

            <div className='transport'>

                <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}>
                    <PreviousIcon className="svg-icon" />
                </button>
                <button className="Next" onClick={() => setCurrentSongIndex((currentSongIndex + 1) % queue.length)}>
                    <NextIcon className="svg-icon" />
                </button>


                <button className="Play" onClick={togglePlayPause}>
                    {isPlaying ? <div className="pause-button"></div> : <div className="play-button"></div>}
                </button>

            </div>

            <div className="Time">
                {calculateTime(currentTime)} / {calculateTime(duration)}
            </div>
            <div className="seek-control">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={isSeeking ? 0 : currentTime}
                    onChange={handleSeekChange}
                    onMouseDown={() => setIsSeeking(true)}
                    onMouseUp={() => setIsSeeking(false)}
                    className="seek-slider"
                    step=".05"
                />
            </div>
            <div className="volume-control">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
