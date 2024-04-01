import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the context
export const MusicDataContext = createContext();

// Defining and directly exporting the provider component
export const MusicDataProvider = ({ children }) => {
    const [albumIndex, setAlbumIndex] = useState({});
    const [songIndex, setSongIndex] = useState({});
    const [albumDetails, setAlbumDetails] = useState({}); // State for detailed album information

    useEffect(() => {
        const fetchData = async () => {
            // Placeholder for actual fetch calls
            // Example: Fetch the album and song index from your API and set state
            const fetchedAlbums = {
                // Example data structure
                // 1: { id: 1, name: 'Album 1', ... },
                // 2: { id: 2, name: 'Album 2', ... },
            };
            const fetchedSongs = {
                // Example data structure
                // 1: { id: 1, title: 'Song 1', albumId: 1, ... },
                // 2: { id: 2, title: 'Song 2', albumId: 1, ... },
            };

            // Update state with fetched data
            setAlbumIndex(fetchedAlbums);
            setSongIndex(fetchedSongs);
        };

        fetchData();
    }, []);

    // Function to update detailed information for a specific album
    const updateAlbumDetails = (albumId, details) => {
        setAlbumDetails(prevDetails => ({
            ...prevDetails,
            [albumId]: details, // Update the specific album's details
        }));
    };

    return (
        <MusicDataContext.Provider value={{ albumIndex, songIndex, albumDetails, updateAlbumDetails }}>
            {children}
        </MusicDataContext.Provider>
    );
};

// Defining and directly exporting the custom hook for using the context
export const useMusicData = () => useContext(MusicDataContext);
