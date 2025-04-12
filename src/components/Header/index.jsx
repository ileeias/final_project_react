// Это поле навигации здесь будут оснывные элементы навигации для пользователя

import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header({ changeModalRegistration, changeModalLogin }) {
  return (
    // На этапе разработки обе панели навигации будут видны выведены, до момента введения рабочей системы входа
    <div>
      {/* Это навигация до входа и аутентификации пользователя */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home Page
        </Link>
        <Link className={styles.link} onClick={changeModalRegistration}>
          Registration
        </Link>
        <Link className={styles.link} onClick={changeModalLogin}>
          Log In
        </Link>
      </nav>
      {/* Это навигация после авторизации пользователя и которая доступна ему */}
      <nav className={styles.nav}>
        <Link to="/photo" className={styles.link}>
          Photo
        </Link>
        <Link className={styles.link}>Video</Link>
        <Link className={styles.link}>Categories</Link>
        <Link className={styles.link}>Albums</Link>
      </nav>
    </div>
  );
}
