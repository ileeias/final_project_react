import { useForm } from 'react-hook-form';
import React from 'react';
import { axiosInstance } from '../../services/axios';
import '../../styles/components/createphoto.scss'

const CreatePhoto = () => {
  const { register, handleSubmit, setError } = useForm();

  const onError = (errors, e) => console.log('ERRORS', errors, e);

  const onSubmitPhoto = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('url', data.url);
      formData.append('description', data.description);
      formData.append('isPublic', data.isPublic);
      formData.append('album', data.album);

      const response = await axiosInstance.post('/photo', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Photo created:', response.data);
      alert('Photo created:', response.data);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
      alert('Ошибка при создании фотографии');
    }
  };

  return (
    <div className="createphoto_container">
      {/* Форма для добавления фото */}
      <form onSubmit={handleSubmit(onSubmitPhoto, onError)} className="createphoto_form">
        <div className="createphoto_inputs">
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Название"
            className="createphoto_input"
          />
          <input
            type="text"
            {...register('url', { required: true })}
            placeholder="URL фото"
            className="createphoto_input"
          />
          <input
            type="text"
            {...register('description', { required: true })}
            placeholder="Описание"
            className="createphoto_input"
          />
          <input
            type="text"
            {...register('album', { required: true })}
            placeholder="Альбом"
            className="createphoto_input"
          />
          <label className="createphoto_label">
            <input type="checkbox" {...register('isPublic')} className="createphoto_checkbox" />
            Сделать фото публичным
          </label>
        </div>
        <button type="submit" className="createphoto_button">
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreatePhoto;
