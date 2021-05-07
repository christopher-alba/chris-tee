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
import { useLocation } from 'react-router-dom';
import { AUTHENTICATE, GET_CART } from '../ApolloClient/queries';
import { useQuery } from '@apollo/client';

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
  navbarBrand: {
    letterSpacing: 5,
  },
  navlinkHighlighted: {
    borderBottom: '1px solid black',
    borderRadius: 0,
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
  const { loading, error, data: authData } = useQuery(AUTHENTICATE);
  const { loading: cartLoading, error: cartError, data: cartData } = useQuery(
    GET_CART,
    {
      variables: {
        username: (authData && authData.me.username) || '',
      },
    }
  );

  const classes = useStyles();
  const location = useLocation();
  if (cartLoading || loading) {
    return <div>...loading</div>;
  }
  const numberOfCartItems = cartData.cart && cartData.cart.products.length || 0;
  return (
    <HideOnScroll>
      <AppBar className={classes.mainNav} position="sticky">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.navLeft}>
              <Typography className={classes.navbarBrand} variant="h6">
                CHRIS TEE
              </Typography>
              <Button
                className={
                  location.pathname === '/' ? classes.navlinkHighlighted : ''
                }
                style={{ marginLeft: '50px' }}
                color="inherit"
                href="#/"
              >
                Home
              </Button>
              <Button
                className={
                  location.pathname === '/shop'
                    ? classes.navlinkHighlighted
                    : ''
                }
                color="inherit"
                href="#/shop"
              >
                Shop
              </Button>
              <Button
                className={
                  location.pathname === '/about'
                    ? classes.navlinkHighlighted
                    : ''
                }
                color="inherit"
                href="#/about"
              >
                About
              </Button>
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
              <IconButton
                className={
                  location.pathname === '/cart'
                    ? classes.navlinkHighlighted
                    : ''
                }
                href="#/cart"
              >
                <Badge badgeContent={numberOfCartItems} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button
                className={
                  location.pathname === '/signup'
                    ? classes.navlinkHighlighted
                    : ''
                }
                color="inherit"
                href="?#/signup"
              >
                Signup
              </Button>
              {authData ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.removeItem('authorization');
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className={
                    location.pathname === '/login'
                      ? classes.navlinkHighlighted
                      : ''
                  }
                  color="inherit"
                  href="?#/login"
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
