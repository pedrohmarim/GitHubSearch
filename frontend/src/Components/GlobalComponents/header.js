import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FaGithub } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { MenuItem, MenuList } from '@material-ui/core';
import logoutService from '../../services/logout';

const Header = ({ headerColor }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleAuthLogoutBtn() {
    isAuthenticated && dispatch(logoutService());
  }

  const [username, setUserName] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  }, []);

  return (
    <header className={window.location.pathname === '/search' ? 'fixedHeader' : ''}>
      <div className={headerColor ? 'solidHeader d-flex justify-content-between align-items-center p-3' : 'd-flex justify-content-between align-items-center p-3'}>
        <div className="d-flex align-items-center">
          <FaGithub size={40} color="#fff" />
          {headerColor ? <h2 style={{ marginLeft: 10 }}>GitHub Search</h2> : <></>}
        </div>

        <div className="header navbar navbar-expand-lg">
          <div className="d-flex align-items-center">
            <ul className="navbar-nav">
              <li className="dropdown">
                <span className="nav-link dropdown-toggle" data-toggle="dropdown">
                  {username}
                </span>

                <MenuList className="dropdown-menu">
                  <MenuItem className="dropdown-item" onClick={handleAuthLogoutBtn}>
                    Sign out
                          <FiLogOut color="#000" size={25} style={{ marginLeft: 5 }} />
                  </MenuItem>
                </MenuList>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
