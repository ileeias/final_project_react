import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { axiosInstance } from '../../services/axios';

const CreateAlbum = () => {
  const { register, handleSubmit, setError } = useForm();

  const onError = (errors, e) => console.log('ERRORS', errors, e);
  const onSubmitAlbum = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('year', data.year);
      const response = await axiosInstance.post('/album', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Album created:', response.data);
      alert('Album created', response.data);
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
      alert('Ошибка при создании альбома');
    }
  };

  return (
    <div>
      {/* Форма для добавления фото */}
      <form onSubmit={handleSubmit(onSubmitAlbum, onError)}>
        <div>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Название"
          />
          <input
            type="text"
            {...register('year', { required: true })}
            placeholder="год"
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateAlbum;
