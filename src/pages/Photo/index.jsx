import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import styles from './Photo.module.css';

export default function Photo() {
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
        console.log(response.data)
      } catch (error) {
        console.log('Error', error.response.request.response);
        setError(error.response.request.response);
      }
    }
    getAllPhotos();
  }, []);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.photo_container}>
      <h1 className={styles.photo_header}>Photo Collection</h1>
      <div className={styles.photo_cards}>
        {res.length > 0 ? (
          res.map((item) => (
            <div key={item.id} className={styles.photo_card}>
              <img className={styles.photo_img} src={item.url} />
              <h1 className={styles.photo_title}>{item.title}</h1>
            </div>
          ))
        ) : (
          'Загрузка...'
        )}
      </div>
    </div>
  );
}
