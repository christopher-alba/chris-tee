import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../ApolloClient/mutations';

const useStyles = makeStyles({
  registerFormWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
  },
  formInputs: {
    width: '50%',
    marginTop: '20px',
  },
  registerPageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '91.9vh',
    width: '100vw',
    margin: '0 auto',
  },
});

const Register = () => {
  const [Register] = useMutation(REGISTER);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleRegister = () => {
    Register({
      variables: {
        username: username,
        password: password,
        permission: 'BASIC',
      },
    }).then((res) => {
      localStorage.setItem('authorization', res.data.register.token);
      location.assign('/#/');
    });
  };
  return (
    <Box className={classes.registerPageWrapper}>
      <form className={classes.registerFormWrapper}>
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
