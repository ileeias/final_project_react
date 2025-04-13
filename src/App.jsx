// В проекте есть разделения для лучшей читаемости кода.
// Папка "pages" будет содержать основные страницы сайта.
// Папка "components" содержать основные элементы страниц сайта.

// В проекте используется модульная система стилей для каждого компонента и основных страниц.

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './assets/css/style.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Photo from './pages/Photo';
import CreatePage from './pages/CreatePage';

function App() {
  const [modal, setModal] = useState(null);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('saveSession'))

  // Проверка авторизации
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true)
      localStorage.setItem("saveSession", authenticated)
    } else {setAuthenticated(false)}
  })

  //Управление модальным окном
  const changeModalRegistration = () => {
    // это модальное окно регистрации пользователя
    setModal(<Registration changeModalClose={changeModalClose} />);
  };
  //  это модальное окно входа пользователя
  const changeModalLogin = () => {
    setModal(<Login changeModalClose={changeModalClose} />);
  };
  // закрытие модального окна
  const changeModalClose = () => {
    setModal(null);
  };

  return (
    <>
      {/* Поле навигации */}
      <Header
        changeModalLogin={changeModalLogin}
        changeModalRegistration={changeModalRegistration}
        authenticated={authenticated}
      />

      {/* Модальное окно */}
      {modal}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
