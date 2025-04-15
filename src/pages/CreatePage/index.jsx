//страница с секретом, если вписать определенную команду в поле, то будет возможность запостить контент
import React, { useState } from 'react';
import CreatePhoto from '../../components/CreatePhoto';
import CreateVideo from '../../components/CreateVideo';
import CreateAlbum from '../../components/CreateAlbum';

const CreatePage = () => {
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAccess = (event) => {
    event.preventDefault();
    if (inputValue === 'Imasuperuser') {
      setIsSuperUser(true);
      localStorage.setItem('user', isSuperUser);
    } else {
      setIsSuperUser(false);
      localStorage.removeItem('user')
    }
  };


  return (
    <div>
      {/* Встречающее меню для кодового слова */}
      <h1>Create Page (Imasuperuser)</h1>
      <form onSubmit={handleAccess}>
        <input
          type="text"
          placeholder="Enter key"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {isSuperUser && (
        <>
          <CreatePhoto />
          <CreateVideo />
          <CreateAlbum />
        </>
      )}
    </div>
  );
};

export default CreatePage;
