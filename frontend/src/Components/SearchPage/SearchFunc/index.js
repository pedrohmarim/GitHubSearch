import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, createTheme, ThemeProvider } from '@material-ui/core';

import {
  FiSearch, FiMail, FiUsers, FiFolder, FiBriefcase, FiTwitter,
} from 'react-icons/fi';
import { FaBuilding, FaBlog } from 'react-icons/fa';

import swal from 'sweetalert';
import apiGitHub from '../../../apiGitHub';

const SearchFunc = () => {
  const colorInputs = createTheme({
    palette: {
      primary: {
        main: '#FFF',
      },
    },
  });

  const [searchUser, setSearchUser] = useState('');
  const [userData, setUserData] = useState('');

  function handleSearchUser(e) {
    e.preventDefault();
    apiGitHub.get(`/users/${searchUser}`).then((res) => {
      setUserData(res.data);
    }).catch(() => {
      swal({
        title: 'Warn',
        text: 'Invalid username',
        icon: 'warning',
        dangerMode: true,
      });
    });
  }

  const SearchForm = () => (
    <div className="centered">
      <form className={window.innerWidth < 500 ? 'searchContainer' : 'searchContainer w-50'} onSubmit={handleSearchUser}>
        <div className="d-flex align-items-center">
          <FiSearch size={40} color="#FFF" style={{ marginRight: 10 }} />
          <h1>Search someone</h1>
        </div>
        <TextField
          autoComplete="off"
          color="primary"
          required
          placeholder="Type here...."
          margin="normal"
          fullWidth
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <button type="submit" id="submitUserToSearchBtn" className="d-flex align-items-center justify-content-center">
          <FiSearch style={{ marginRight: 5 }} />
          Search
        </button>
      </form>
    </div>
  );

  const UserDataContainer = () => (
    <div className={window.innerWidth < 500 ? '' : 'centered'}>
      <div className={window.innerWidth < 500 ? 'd-block align-items-center w-75 ' : 'd-flex align-items-center'} id="userDataContainer">
        <div>
          <img src={userData.avatar_url} alt="UserProfile" id="searchedUserImg" />
        </div>

        <div className={window.innerWidth < 500 ? 'p-3 infoUserContainer' : ''}>
          <h2>{userData.name ? userData.name : 'Failed to load username'}</h2>

          <p>{userData.bio ? userData.bio : 'Bio not registered'}</p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FaBuilding style={{ marginRight: 5 }} />
            <strong>Company: </strong>
            {' '}
            {userData.company ? userData.company : 'Company not registered'}
          </p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FaBlog style={{ marginRight: 5 }} />
            <strong>Blog:</strong>
            {' '}
            {userData.blog ? userData.blog : 'Blog not registered'}
          </p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FiTwitter style={{ marginRight: 5 }} />
            <strong>Twitter: </strong>
            {userData.twitter_username ? userData.twitter_username : 'Twitter not registered'}
          </p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FiFolder style={{ marginRight: 5 }} />
            <strong>Repositories:</strong>
            {' '}
            {userData.public_repos ? userData.public_repos : 'Failed to load repos'}
          </p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FiMail style={{ marginRight: 5 }} />
            <strong>E-mail: </strong>
            {userData.email ? userData.email : 'Email not registered'}
          </p>

          <p className={window.innerWidth < 500 ? '' : 'd-flex align-items-center'}>
            <FiBriefcase style={{ marginRight: 5 }} />
            <strong>Open to work:</strong>
            {' '}
            {userData.hireable ? 'Yes' : 'No'}
          </p>

          <div className="d-flex align-items-center">
            <p style={{ marginRight: 5 }}>
              <FiUsers style={{ marginRight: 5 }} />
              <strong>Followers:</strong>
              {' '}
              {userData.followers ? userData.followers : '0'}
              {' '}
              •
            </p>

            <p>
              <strong>Following: </strong>
              {userData.following ? userData.following : '0'}
            </p>
          </div>

          <Link to={`/${searchUser}/repos`}>
            <button id="showRepo" className="d-flex align-items-center justify-content-center">
              <FiFolder style={{ marginRight: 5 }} />
              View Repositories
            </button>
          </Link>

        </div>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={colorInputs}>
      <div>
        {userData !== '' ? UserDataContainer() : SearchForm()}
      </div>
    </ThemeProvider>
  );
};

export default SearchFunc;
