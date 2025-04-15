import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import '../../styles/components/createvideo.scss'

const CreateVideo = () => {
  const { register, handleSubmit, setError } = useForm();

  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmitVideo = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('url', data.url);
      formData.append('description', data.description);
      formData.append('isPublic', data.isPublic);
      formData.append('album', data.album);

      const response = await axiosInstance.post('/video', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Video created:', response.data);
      alert('Video created', response.data);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
      alert('Ошибка при создании видео');
    }
  };

  return (
    <div className="createvideo_container">
      {/* Форма для добавления фото */}
      <form onSubmit={handleSubmit(onSubmitVideo, onError)} className="createvideo_form">
        <div className="createvideo_inputs">
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Название"
            className="createvideo_input"
          />
          <input
            type="text"
            {...register('url', { required: true })}
            placeholder="URL видео"
            className="createvideo_input"
          />
          <input
            type="text"
            {...register('description', { required: true })}
            placeholder="Описание"
            className="createvideo_input"
          />
          <input
            type="text"
            {...register('album', { required: true })}
            placeholder="Альбом"
            className="createvideo_input"
          />
          <label className="createvideo_label">
            <input type="checkbox" {...register('isPublic')} className="createvideo_checkbox" />
            Сделать видео публичным
          </label>
        </div>
        <button type="submit" className="createvideo_button">
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateVideo;