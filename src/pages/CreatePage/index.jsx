//страница с секретом, если вписать определенную команду в поле, то будет возможность запостить контент
import React, { useState } from 'react';
import CreatePhoto from '../../components/CreatePhoto';
import CreateVideo from '../../components/CreateVideo';
import CreateAlbum from '../../components/CreateAlbum';
import '../../styles/pages/createpage.scss'

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
    <div className="createpage_container">
      {/* Встречающее меню для кодового слова */}
      <h1 className="createpage_title">Create Page (Imasuperuser)</h1>
      <form onSubmit={handleAccess} className="createpage_form">
        <input
          type="text"
          placeholder="Enter key"
          value={inputValue}
          onChange={handleInputChange}
          className="createpage_input"
        />
        <button type="submit" className="createpage_button">Submit</button>
      </form>
      {isSuperUser && (
        <div className="creating_section">
          <div>
            <h1>Photo</h1>
            <CreatePhoto />
          </div>
          <div>
            <h1>Video</h1>
            <CreateVideo />
          </div>
          <div>
            <h1>Album</h1>
            <CreateAlbum />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
