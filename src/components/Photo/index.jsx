import { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/photo.scss'
import { FaTrashAlt } from "react-icons/fa";

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
      className="photo_cards"
      onClick={() => handleSelect(id)}
    >
      <img className="photo_img" src={url} />
      <p className="photo_title">{title}</p>
      {isSuperuser ? (
        <div className="photo_del_button">
          <FaTrashAlt
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(id);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
