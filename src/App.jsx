// В проекте есть разделения для лучшей читаемости кода.
// Папка "pages" будет содержать основные страницы сайта.
// Папка "components" содержать основные элементы страниц сайта.

// В проекте используется модульная система стилей для каждого компонента и основных страниц.

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './assets/css/style.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { useState } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Photo from './pages/Photo';

function App() {
  const [modal, setModal] = useState(null);

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
      />

      {/* Модальное окно */}
      {modal}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
