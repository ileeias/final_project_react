import ReactPlayer from 'react-player';
import styles from './Video.module.css';
import { useState } from 'react';
import { axiosInstance } from '../../services/axios';

export default function Video({ id, url, title, setMove, move }) {
  const [error, setError] = useState();
  const isSuperuser = localStorage.getItem('user');

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/video/${id}`);
      alert('Video deleted!');
      setMove(!move);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
    }
  };

  return (
    <div key={id} className={styles.video_card}>
      <ReactPlayer url={url} light={true} width={360} height={360} />
      <h1 className={styles.video_title}>{title}</h1>
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
