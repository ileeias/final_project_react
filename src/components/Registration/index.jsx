import axios from 'axios';
import styles from './Registration.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../services/axios';

export default function Registration({ changeModalClose, changeModalLogin }) {
  const { register, handleSubmit } = useForm();
  const [errors, setError] = useState(null);

  // обработчик ошибок для формы
  const onError = (errors, e) => {
    alert('Заполните все поля!');
    console.log('ERRORS', errors, e);
  };

  // POST запрос на сервер регестрации пользователя, data - данные из формы
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      console.log(response.status);
      if (response.status == 201) {
        changeModalClose();
        alert("Ура! Вы успешно зарегестрированны!!!");
      }
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.mcontainer}>
          <div className={styles.header}>
            <h2>Registration</h2>
            <span className={styles.close} onClick={changeModalClose}>
              ✕
            </span>
          </div>
          <div className={styles.body}>
            <div className={styles.formcontainer}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={styles.group}>
                  <label htmlFor="name">Ваше полное имя</label>
                  <input
                    type="text"
                    {...register('username', { required: true })}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="name">Email</label>
                  <input
                    type="text"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="name">Пароль</label>
                  <input
                    type="text"
                    {...register('password', { required: true })}
                  />
                </div>
                {errors ? <p className={styles.error}>{errors}</p> : <p></p>}
                <button type="submit">Registration</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
