import styles from './Login.module.css';
import { useForm } from 'react-hook-form';

export default function Login({ changeModalClose }) {
  const { register, handleSubmit } = useForm();

  const onError = (errors) => console.log('ERRORS', errors);
  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.mcontainer}>
          <div className={styles.header}>
            <h2>Log in</h2>
            <span className={styles.close} onClick={changeModalClose}>
              ✕
            </span>
          </div>
          <div className={styles.body}>
            <div className={styles.formcontainer}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                <div className={styles.actions}>
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
