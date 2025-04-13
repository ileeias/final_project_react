import styles from "./Photo.module.css";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';

export default function Photo() {
  const [res, setRes] = useState('');

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
  }, []);

  return <div>{res ? JSON.stringify(res) : 'Загрузка...'}</div>;
}
