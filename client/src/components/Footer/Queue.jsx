import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';
import axios from 'axios';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const {
        queue, 
        currentSongIndex, 
        setCurrentSongById, 
        shuffleQueue, 
        resetQueue, 
        toggleFavorite, 
        toggleShowFavorites,
        showFavorites
    } = useContext(CentralQueueContext);

    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSongClick = (id) => {
        setCurrentSongById(id);
    };

    const saveFavoritesAsPlaylist = async () => {
        const favoriteSongs = queue.filter(song => song.isFavorite);
        if (favoriteSongs.length > 0 && playlistName) {
            try {
                await axios.post('/api/playlists', { name: playlistName, songs: favoriteSongs });
                setIsModalOpen(false);
                setPlaylistName('');
            } catch (error) {
                console.error('Error saving playlist:', error);
            }
        }
    };

    return (
        <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget || e.target.className.includes('QueueTitle')) {
                toggleQueue();
            }
        }}>
            <div className="QueueTitle">Queue</div>
            <button onClick={(e) => { e.stopPropagation(); shuffleQueue(); }}>Shuffle</button>
            <button onClick={(e) => { e.stopPropagation(); resetQueue(); }}>Reset Queue</button>
            <button onClick={(e) => { e.stopPropagation(); toggleShowFavorites(); }}>
                {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}>
                Save Favorites as Playlist
            </button>
            {isExpanded && (
                <div className="QueueItems" onClick={(e) => e.stopPropagation()}>
                    {queue.filter(song => !showFavorites || song.isFavorite).map((song) => (
                        <div key={song.id}
                             className={`QueueItem ${song.globalIndex === currentSongIndex ? 'highlight' : ''}`}
                             onClick={() => handleSongClick(song.id)}>
                            {song.name}
                            <span className={`favorite-icon ${song.isFavorite ? 'is-favorite' : ''}`}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(song.id);
                                  }}>★</span>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Name Your Playlist</h2>
                        <input 
                            type="text" 
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Enter playlist name"
                        />
                        <button onClick={saveFavoritesAsPlaylist}>Save Playlist</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Queue;
