// imageService.js

// Placeholder for a database-driven approach or static file mapping
const albumImageMap = {
  '1': '1_CHARLOTTA.png',
  '2': '2_OBJECTS-PARTICLES.png',
  '3': '3_GLASS-CITY-OF-US.png',
  
  // Additional mappings...
};

const getImageNameByAlbumId = (albumId) => {
  return albumImageMap[albumId] || null;
}

/*
class ImageService {
  static getImageNameByAlbumId(albumId) {
    // In a real application, you might replace this with a database query
    return albumImageMap[albumId] || null;
  }
}
*/


module.exports = {getImageNameByAlbumId};
