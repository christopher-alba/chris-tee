import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../ApolloClient/mutations';
const useStyles = makeStyles({
  loginFormWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
  },
  formInputs: {
    width: '50%',
    marginTop: '20px',
  },
  loginPageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '91.9vh',
    width: '100vw',
    margin: '0 auto',
  },
});

const Login = () => {
  const [login] = useMutation(LOGIN);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleLogin = () => {
    login({
      variables: {
        username: username,
        password: password,
      },
    }).then((res) => {
      localStorage.setItem('authorization', res.data.login.token);
      location.assign('/#/');
    });
  };
  useEffect(() => {
    location.assign('/?#/login');
  },[location.href])
  return (
    <Box className={classes.loginPageWrapper}>
      <form className={classes.loginFormWrapper}>
        <TextField
          label="username"
          className={classes.formInputs}
          variant="outlined"
          onChange={handleUsernameChange}
        />
        <TextField
          label="password"
          className={classes.formInputs}
          type="password"
          variant="outlined"
          onChange={handlePasswordChange}
        />
        <Button
          className={classes.formInputs}
          type="submit"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
