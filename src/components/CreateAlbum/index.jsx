import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { axiosInstance } from '../../services/axios';
import '../../styles/components/createalbum.scss'

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
    <div className="createalbum_container">
      {/* Форма для добавления фото */}
      <form onSubmit={handleSubmit(onSubmitAlbum, onError)} className="createalbum_form">
        <div className="createalbum_inputs">
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Название"
            className='createalbum_input'
          />
          <input
            type="text"
            {...register('year', { required: true })}
            placeholder="год"
            className='createalbum_input'
          />
        </div>
        <button type="submit" className='createalbum_button'>Создать</button>
      </form>
    </div>
  );
};

export default CreateAlbum;
