import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../ApolloClient/queries';

const useStyles = makeStyles(() => ({
  filterContainerWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '10px 20px',
    border: '1px solid lightgray',
    borderRadius: '0.5rem',
  },
  filter: {
    width: '150px',
  },
  filterTitle: {
    marginRight: '100px',
  },
  filterWrapper: {
    marginRight: '50px',
  },
  shopTitle: {
    marginTop: '100px',
    marginBottom: '10px',
  },
  shopSubTitle: {
    marginTop: '0px',
    fontWeight: 200,
  },
  filterLabel: {
    background: 'white',
  },
  setFilterButton: {
    height: '56px',
    padding: '0 20px 0 20px',
    background: 'black',
    marginLeft: 'auto',
    color: 'white',
    '&:hover': {
      background: '#2e2e2e',
    },
  },
  productsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '50px',
  },
  product: {
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    position: 'relative',
    marginTop: '10px',
  },
  productLabel: {
    position: 'absolute',
    bottom: '0px',
    background: 'rgba(255,255,255,0.7)',
    width: '100%',
    paddingLeft: '20px',
  },
  pageSelectorWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Shop = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [lowerCount, setLowerCount] = useState(0);
  const [upperCount, setUpperCount] = useState(8);

  if (loading) {
    return <div>loading...</div>;
  }

  const totalPages =
    Math.floor(data.products.length / 8) + (data.products.length % 8 >= 1);
  const products = data.products.slice(lowerCount, upperCount);

  return (
    <Container>
      <h1 className={classes.shopTitle}>SHOPPING PAGE</h1>
      <h2 className={classes.shopSubTitle}>BROWSING ALL PRODUCTS</h2>
      <Box className={classes.filterContainerWrapper}>
        <h2 className={classes.filterTitle}>FILTERS</h2>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="basic" className={classes.filterLabel}>
            Basic
          </InputLabel>
          <Select className={classes.filter} labelId="basic" id="basic">
            <MenuItem>none</MenuItem>
            <MenuItem>lowest price</MenuItem>
            <MenuItem>highest price</MenuItem>
            <MenuItem>A-Z</MenuItem>
            <MenuItem>Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="clothing-type" className={classes.filterLabel}>
            Clothing type
          </InputLabel>
          <Select
            className={classes.filter}
            labelId="clothing-type"
            id="clothing-type"
          >
            <MenuItem>none</MenuItem>
            <MenuItem>lowest price</MenuItem>
            <MenuItem>highest price</MenuItem>
            <MenuItem>A-Z</MenuItem>
            <MenuItem>Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="orientation" className={classes.filterLabel}>
            Orientation
          </InputLabel>
          <Select
            className={classes.filter}
            labelId="orientation"
            id="orientation"
          >
            <MenuItem>none</MenuItem>
            <MenuItem>feminine</MenuItem>
            <MenuItem>masculine</MenuItem>
            <MenuItem>unisex</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" className={classes.setFilterButton}>
          Set Filters
        </Button>
      </Box>
      <Box className={classes.pageSelectorWrapper}>
        <Button
          variant="outlined"
          disabled={lowerCount === 0}
          onClick={() => {
            if (lowerCount > 0) {
              setLowerCount(lowerCount - 8);
              setUpperCount(upperCount - 8);
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous Page
        </Button>
        {currentPage}/{totalPages}
        <Button
          variant="outlined"
          disabled={upperCount >= data.products.length}
          onClick={() => {
            if (upperCount < data.products.length) {
              setLowerCount(lowerCount + 8);
              setUpperCount(upperCount + 8);
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next Page
        </Button>
      </Box>

      <Box className={classes.productsWrapper}>
        {products.map((product) => (
          <Box key={product.id} className={classes.product}>
            <img
              src="https://picsum.photos/seed/picsum/400/300"
              alt="product"
            />
            <Box className={classes.productLabel}>
              <p>{product.name}</p>
              <p>NZD${product.price}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Shop;
