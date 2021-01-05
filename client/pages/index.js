import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTHENTICATE } from '../ApolloClient/queries';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  homeLandingWrapper: {
    background: '#2b2b2b',
    color: 'white',
    height: '500px',
  },
  homeLandingInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  homeLandingHeader: {
    margin: 0,
  },
  homeLandingText: {
    fontSize: '1.5rem',
  },
  homeMenu: {
    margin: 10,
  },
  homeMenuMasculine: {
    background:
      'url(https://www.thefearlessman.com/wp-content/uploads/2017/10/Confident-and-Masculine-Man-Penetrating.jpeg)',
    backgroundSize: 'cover',
    width: '100%',
    height: '400px',
    transition: '500ms',
    backgroundPosition: 'center',
  },
  homeMenuFeminine: {
    background:
      'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbz-emrata-index-1565195302.jpg)',
    backgroundSize: 'cover',
    width: '100%',
    height: '400px',
    transition: '500ms',
    backgroundPosition: 'center',
  },
  homeMenuInner: {
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '500ms',
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
      transition: '500ms',
      fontSize: '1.5rem',
      background: 'rgba(255,255,255,0.3)',
    },
  },
  shopLink: {
    textDecoration: 'none',
  },
  landingButton: {
    width: '200px',
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      background: 'black',
    },
  },
});

const Homepage = () => {
  const { loading, error, data } = useQuery(AUTHENTICATE);
  const classes = useStyles();
  let name = null;
  if (data) {
    name = data.me.username;
  }

  return (
    <Box>
      <Box className={classes.homeLandingWrapper}>
        <Container className={classes.homeLandingInner}>
          <h1 className={classes.homeLandingHeader}>
            WELCOME TO CHRIS TEE {name}
          </h1>
          <p className={classes.homeLandingText}>
            Helping people of all sizes and genders find their style
          </p>
          <Button
            className={classes.landingButton}
            variant="outlined"
            href="#/shop"
          >
            View All Products
          </Button>
        </Container>
      </Box>
      <Box className={classes.homeMenu}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <Link className={classes.shopLink} to="/shop?category=masculine">
              <Box className={classes.homeMenuMasculine}>
                <Box className={classes.homeMenuInner}>
                  <h2>MASCULINE</h2>
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Link className={classes.shopLink} to="/shop?category=feminine">
              <Box className={classes.homeMenuFeminine}>
                <Box className={classes.homeMenuInner}>
                  <h2>FEMININE</h2>
                </Box>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Homepage;
