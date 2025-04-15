// Это поле навигации здесь будут оснывные элементы навигации для пользователя

import { Link } from 'react-router-dom';
import logoimg from '../../assets/images/picture.png';
import '../../styles/components/header.scss'

export default function Header({
  changeModalRegistration,
  changeModalLogin,
  authenticated,
  removeToken
}) {
  return (
    // На этапе разработки обе панели навигации будут видны выведены, до момента введения рабочей системы входа
    <div className="header_container">
      <div className="logo">
        <Link to="/" className="logo">
          Postogram
        </Link>
        <img src={logoimg} className="logo_img" />
      </div>
      {authenticated ? (
        // Это навигация после авторизации пользователя и которая доступна ему
        <nav className="header_nav">
          <Link to="/" className="link">
            Home Page
          </Link>
          <Link to="/photos" className="link">
            Photo
          </Link>
          <Link to="/videos" className="link">Video</Link>
          <Link to="/albums" className="link">Albums</Link>
          <Link to="/create" className="link">
            Create
          </Link>
          <Link to="/" className="link" onClick={removeToken}>logout</Link>
        </nav>
      ) : (
        // Это навигация до входа и аутентификации пользователя
        <nav className="header_nav">
          <Link to="/" className="link">
            Home Page
          </Link>
          <Link className="link" onClick={changeModalRegistration}>
            Registration
          </Link>
          <Link className="link" onClick={changeModalLogin}>
            Log In
          </Link>
        </nav>
      )}
    </div>
  );
}
