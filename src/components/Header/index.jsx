// Это поле навигации здесь будут оснывные элементы навигации для пользователя

import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logoimg from '../../assets/images/picture.png'

export default function Header({ changeModalRegistration, changeModalLogin }) {
  return (
    // На этапе разработки обе панели навигации будут видны выведены, до момента введения рабочей системы входа
    <div className={styles.header_container}>
      {/* Это навигация до входа и аутентификации пользователя */}
      <div className={styles.logo}>
        <Link to="/" className={styles.logo}>
          Postogram
        </Link>
        <img src={logoimg} className={styles.logo_img} />
      </div>
      {/* Это навигация после авторизации пользователя и которая доступна ему */}
      <nav className={styles.nav}>
        <Link to="/photo" className={styles.link}>
          Photo
        </Link>
        <Link className={styles.link}>Video</Link>
        <Link className={styles.link}>Categories</Link>
        <Link className={styles.link}>Albums</Link>
      </nav>
      <div className={styles.header_author}>
        <Link className={styles.link} onClick={changeModalRegistration}>
          Registration
        </Link>
        <Link className={styles.link} onClick={changeModalLogin}>
          Log In
        </Link>
      </div>
    </div>
  );
}
