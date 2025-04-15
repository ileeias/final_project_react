import { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/photo.scss'

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
      className="photo_card"
      onClick={() => handleSelect(id)}
    >
      <img className="photo_img" src={url} />
      <h1 className="photo_title">{title}</h1>
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
