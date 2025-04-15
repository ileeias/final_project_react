import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/axios';
import styles from './ObjectDetails.module.css';

export default function ObjectDetails() {
  const [album, setAlbum] = useState();
  const [res, setRes] = useState({});
  const [error, setError] = useState(null);
  const { media, id } = useParams(); // Получение ID из URL

  useEffect(() => {
    async function getById() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get(`/${media}/${id}`, {
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
    getById();
  }, [media, id]);

  return (
    <div className={styles.photo_card}>
      {error ? (
        <h1>{error}</h1> 
      ) : (
        <>
          <img className={styles.photo_img} src={res.url} alt={res.title}/>
          <h1 className={styles.photo_title}>{res.title}</h1>
          <h2 className={styles.photo_description}>{res.description}</h2>
        </>
      )}
    </div>
  );
}
