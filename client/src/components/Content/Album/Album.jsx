// Album.jsx

import React, {useState, useEffect} from 'react';
import Cover from './Cover';
import './Album.css';
//mport { API_BASE_URL } from '../../../utils/const';

// Assuming you've moved your images to be served statically and set REACT_APP_API_URL in your environment
function Album({ albumId }) {

  /*
  //const imageUrl = `${API_BASE_URL}/static/images/Covers/1_CHARLOTTA.png`;
  const imageUrl = `${API_BASE_URL}/api/covers/${albumId}`;

  console.log(`Fetching album cover for album ID ${albumId} from: ${imageUrl}`);
*/
const [albumData, setAlbumData] = useState(null);
const imageUrl = "";

useEffect(() => {
  fetch(`/api/albums/${albumId}`)
    .then(res => res.json())
    .then(data =>setAlbumData(data))

},[]);



  return  albumData && (
    <div className="album">
      <Cover imageUrl={albumData.cover_url} />
    </div>
  );
}

export default Album;
