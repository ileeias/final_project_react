// Это поле навигации здесь будут оснывные элементы навигации для пользователя

import { Link } from 'react-router-dom';
import logoimg from '../../assets/images/picture.png';
import '../../styles/components/header.scss'
import { IoExitSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useState } from 'react';



export default function Header({
  changeModalRegistration,
  changeModalLogin,
  authenticated,
  removeToken
}) {
  const [show, setShow] = useState(false);

  const showMedia = () => {
    setShow(!show)
  }
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
        <nav className="header_nav_after">
          <div className="header_nav_after_base">
            <Link to="/" className="link">
              Home Page
            </Link>
            <Link className="link" onClick={showMedia}>
              Media
            </Link>
            {show &&
              <div className="media_list">
                <Link to="/photos" className="media_link">Photo</Link>
                <Link to="/videos" className="media_link" >Video</Link>
                <Link to="/albums" className="media_link" >Albums</Link>
              </div>
            }
            <Link to="/create" className="link">
              Create
            </Link>
          </div>
          <div className="header_nav_after_end">
            <Link to="/" className="link" onClick={removeToken}><IoExitSharp className="exit_icon" /></Link>
            <IoMdSettings className="settings_icon" />
          </div>
        </nav>
      ) : (
        // Это навигация до входа и аутентификации пользователя
        <nav className="header_nav_before">
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
