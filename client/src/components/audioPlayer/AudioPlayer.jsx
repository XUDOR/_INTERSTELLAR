import React, { useEffect, useState, useRef, useContext } from 'react';
import { MusicDataContext } from '../../Contexts/MusicDataContext';
import { ReactComponent as PlayIcon } from '../../images/Icons/play-blue.svg';
import { ReactComponent as PauseIcon } from '../../images/Icons/Pause.svg';
import { ReactComponent as NextIcon } from '../../images/Icons/next.svg';
import { ReactComponent as PreviousIcon } from '../../images/Icons/back.svg';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { state: { queue, currentSongIndex }, setCurrentSongIndex } = useContext(MusicDataContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(0.9);
    const audioPlayer = useRef(null);

    const currentSong = queue[currentSongIndex] || {};

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.src = currentSong.audioUrl;
            audioPlayer.current.load();
        }
    }, [currentSong]);

    useEffect(() => {
        const player = audioPlayer.current;
        if (player) {
            const updateProgress = () => setCurrentTime(player.currentTime);
            const updateDuration = () => setDuration(player.duration);

            player.addEventListener('timeupdate', updateProgress);
            player.addEventListener('loadedmetadata', updateDuration);
            player.addEventListener('ended', () => setCurrentSongIndex((currentSongIndex + 1) % queue.length));

            return () => {
                player.removeEventListener('timeupdate', updateProgress);
                player.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [isPlaying, currentSongIndex, queue.length, setCurrentSongIndex]);

    const togglePlayPause = () => {
        setIsPlaying(prevIsPlaying => {
            if (!prevIsPlaying) {
                if (audioPlayer.current) {
                    audioPlayer.current.play().catch(error => {
                        console.error("Error playing the song:", error);
                        return false;
                    });
                }
            } else {
                if (audioPlayer.current) {
                    audioPlayer.current.pause();
                }
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
            <button className="Back" onClick={() => setCurrentSongIndex((currentSongIndex - 1 + queue.length) % queue.length)}>
                <PreviousIcon className="svg-icon" />
            </button>
            <button className="Play" onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon className="svg-icon" /> : <PlayIcon className="svg-icon" />}
            </button>
            <button className="Next" onClick={() => setCurrentSongIndex((currentSongIndex + 1) % queue.length)}>
                <NextIcon className="svg-icon" />
            </button>
            <div className="Time">
                {calculateTime(currentTime)} / {calculateTime(duration)}
            </div>
            <div className="seek-control">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={isSeeking ? undefined : currentTime}
                    onChange={handleSeekChange}
                    onMouseDown={() => setIsSeeking(true)}
                    onMouseUp={() => setIsSeeking(false)}
                    className="seek-slider"
                    step="1"
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
