import React from 'react';
import './FilmPage.css'; // Ensure this path matches your file structure

const FilmPage = () => {
  return (
    <div className="FilmContainers">
      <div className="FilmContainer">
        <iframe
          src="https://player.vimeo.com/video/935038582?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="FILMS OF NATURE | Glass City of Us | Roderick Shoolbraid"
          loading="lazy"
        ></iframe>
      </div>
      <div className="FilmContainer">
        <iframe
          src="https://player.vimeo.com/video/935116508?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title="TIDAL | NATURA | Roderick Shoolbraid"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default FilmPage;
