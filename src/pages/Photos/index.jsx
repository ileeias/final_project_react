import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import styles from './Photos.module.css';
import Photo from '../../components/Photo';

export default function Photos() {
  const [move, setMove] = useState(false);
  const [res, setRes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllPhotos() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/photo', {
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
    getAllPhotos();
  }, [move]);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.photo_container}>
      <h1 className={styles.photo_header}>Photo Collection</h1>
      <div className={styles.photos_list}>
        {res.length > 0
          ? res.map((item) => (
              <Photo
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
