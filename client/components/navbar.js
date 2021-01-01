import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
  mainNav: {
    background: 'white',
    color: 'black',
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: 0,
  },
  navLeft: {
    display: 'flex',
    width: '600px',
  },
  navRight: {
    display: 'Flex',
    alignItems: 'center',
    width: '100%',
    margin: '10px',
  },
  inputContainer: {
    width: '70%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    width: '80%',
  },
  inputContainerButton: {
    width: '10%',
    height: '56px',
    marginLeft: '10px',
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = () => {
  const classes = useStyles();
  return (
    <HideOnScroll>
      <AppBar className={classes.mainNav} position="sticky">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.navLeft}>
              <Typography variant="h6">CHRIS TEE</Typography>
              <Button style={{ marginLeft: '50px' }} color="inherit">
                Home
              </Button>
              <Button color="inherit">Shop</Button>
              <Button color="inherit">About</Button>
            </Box>
            <Box className={classes.navRight}>
              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.input}
                  label="Search for your item"
                  variant="outlined"
                />
                <Button
                  className={classes.inputContainerButton}
                  variant="outlined"
                >
                  <SearchIcon />
                </Button>
              </Box>
              <IconButton>
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button color="inherit">Signup</Button>
              <Button color="inherit">Login</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
