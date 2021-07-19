import React, { useState } from 'react';
import { TextField, createTheme, ThemeProvider } from '@material-ui/core';

import { FiLock, FiUser, FiLogIn } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { FaGithub } from 'react-icons/fa';
import { authLogin } from '../../../store/fetchActions';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ username: '', password: '' });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    dispatch(authLogin(form));
    setForm({ username: '', password: '' });
  }

  const colorInputs = createTheme({
    palette: {
      primary: {
        main: '#FFF',
      },
    },
  });

  return (
    <ThemeProvider theme={colorInputs}>
      <div className="centered">
        <form onSubmit={handleSubmitForm} id="loginForm">
          <div className="d-flex justify-content-center">
            <FaGithub size={50} color="#fff" />
            <h1 style={{ marginLeft: 10 }}>GitHub Search</h1>
          </div>

          <TextField
            autoComplete="off"
            color="primary"
            required
            placeholder="Type here..."
            margin="normal"
            label={(
              <div>
                <FiUser size={20} />
                {' '}
                User
              </div>
)}
            fullWidth
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
          />
          <TextField
            autoComplete="off"
            color="primary"
            required
            placeholder="Type here..."
            margin="normal"
            label={(
              <div>
                <FiLock size={20} />
                {' '}
                Password
              </div>
)}
            fullWidth
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />

          <button type="submit" id="submitLoginForm" className="d-flex align-items-center justify-content-center">
            <FiLogIn style={{ marginRight: 5 }} />
            Sign in
          </button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
