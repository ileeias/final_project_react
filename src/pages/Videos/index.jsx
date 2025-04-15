import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import styles from './Videos.module.css';
import Video from '../../components/Video';

export default function Videos() {
  const [move, setMove] = useState(false);
  const [res, setRes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllVideos() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/video', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setRes(response.data);
      } catch (error) {
        console.log('Error', error.response.request.response);
        setError(error.response.request.response);
      }
    }
    getAllVideos();
  }, [move]);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.video_container}>
      <h1 className={styles.video_header}>Video Collection</h1>
      <div className={styles.video_cards}>
        {res.length > 0
          ? res.map((item) => (
              <Video
                key={item._id}
                id={item._id}
                url={item.url}
                title={item.title}
                setMove={setMove}
                move={move}
              />
            ))
          : 'Загрузка...'}
      </div>
    </div>
  );
}
