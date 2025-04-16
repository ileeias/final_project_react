import '../../styles/components/login.scss';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../services/axios';
import { useState } from 'react';

export default function Login({ changeModalClose }) {
  const { register, handleSubmit } = useForm();
  const [errors, setError] = useState(null);

  const onError = (errors) => console.log('ERRORS', errors);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      changeModalClose();
    } catch (error) {
      console.log('Error', error.response.request.response);
      setError(error.response.request.response);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="mcontainer">
          <div className="header">
            <h2>Log in</h2>
            <span className="close" onClick={changeModalClose}>
              ✕
            </span>
          </div>
          <div className="body">
            <div className="formcontainer">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="group">
                  <label htmlFor="name">Email</label>
                  <input
                    type="text"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className="group">
                  <label htmlFor="name">Пароль</label>
                  <input
                    type="text"
                    {...register('password', { required: true })}
                  />
                </div>
                <div className="actions">
                  {errors ? <p className="error">{errors}</p> : <p></p>}
                  <button type="submit">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
