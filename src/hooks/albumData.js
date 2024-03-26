const useAlbumData = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch('URL_TO_YOUR_CLOUD_STORAGE_JSON_OR_API');
      const data = await response.json();
      setAlbums(data.map(album => ({
        ...album,
        imageUrl: album.imageUrl // Ensure this URL points to the image in your Google Cloud Storage bucket
      })));
    };

    fetchAlbums();
  }, []);

  return albums;
};
