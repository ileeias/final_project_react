import { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import styles from './Photo.module.css';
import { useNavigate } from 'react-router-dom';

export default function Photo({ id, url, title, setMove, move }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const isSuperuser = localStorage.getItem('user');

  const handleSelect = (id) => {
    const media = 'photo';
    navigate(`/object/${media}/${id}`); // Перенаправление на страницу объекта
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/photo/${id}`);
      alert('Photo deleted!');
      setMove(!move);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
    }
  };

  return (
    <div
      key={id}
      className={styles.photo_card}
      onClick={() => handleSelect(id)}
    >
      <img className={styles.photo_img} src={url} />
      <h1 className={styles.photo_title}>{title}</h1>
      {isSuperuser ? (
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(id);
          }}
        >
          Delete this
        </button>
      ) : null}
    </div>
  );
}
