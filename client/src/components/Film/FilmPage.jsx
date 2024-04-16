import React from 'react';
import './FilmPage.css'; // Make sure the path matches your file structure

const FilmPage = () => {
  return (
    <div className="FilmContainers">
      <div className="FilmContainer">
        <iframe
          src="https://player.vimeo.com/video/935038582"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title="Film Title 1"
          loading="lazy"
        ></iframe>
      </div>
      <div className="FilmContainer">
        <iframe
          src="https://player.vimeo.com/video/935116508"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title="Film Title 2"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default FilmPage;
