import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import Photo from '../../components/Photo';
import Video from '../../components/Video';
import styles from './Albums.module.css';

export default function Albums() {
  const [error, setError] = useState(null);
  const [res, setRes] = useState([]);
  const [target, setTarget] = useState('');
  useEffect(() => {
    async function getAll() {
      try {
        const response = await axiosInstance.get('/album');
        setRes(response.data);
      } catch (error) {
        console.log('Error', error.response.request.response);
        setError(error.response.request.response);
      }
    }
    getAll();
  }, [target]);

  async function openAlbum(e) {
    try {
      const albumId = e.currentTarget.getAttribute('data-album-id');
      const response = await axiosInstance.get(`/album/${albumId}`);
      setTarget(response.data);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
      setTarget('Альбом пуст');
    }
  }

  return (
    <div className={styles.album_container}>
      <h1 className={styles.album_header}>Post Collection</h1>
      <div className={styles.album_cards}>
        {res.length > 0
          ? res.map((item) => (
              <div
                key={item._id}
                className={styles.album_card}
                data-album-id={item._id}
                onClick={openAlbum}
              >
                <h1 className={styles.album_title}>{item.title}</h1>
                <p className={styles.album_year}>{item.year}</p>
              </div>
            ))
          : 'Загрузка...'}
      </div>
      {target && target != 'Альбом пуст' ? (
        <div className={styles.container}>
          <div className={styles.photo_cards}>
            {target.photos.map((item) => (
              <Photo
                key={item.id}
                id={item.id}
                url={item.url}
                title={item.title}
              />
            ))}
          </div>
          <div className={styles.video_cards}>
            {target.videos.map((item) => (
              <Video
                key={item.id}
                id={item.id}
                url={item.url}
                title={item.title}
              />
            ))}
          </div>
        </div>
      ) : (
        'Альбом пуст'
      )}
    </div>
  );
}
