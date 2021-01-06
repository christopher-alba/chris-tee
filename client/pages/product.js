import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, AUTHENTICATE, GET_CART } from '../ApolloClient/queries';
import { UPDATE_CART } from '../ApolloClient/mutations';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import EditProductDialog from '../components/editProductDialog';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  productPageWrapper: {
    marginTop: '100px',
    marginBottom: '100px',
  },
  productImage: {
    height: '500px',
  },
  editProductButton: {
    marginRight: '20px',
    height: '56px',
  },
  filterWrapper: {
    marginRight: '20px',
    width: '100px',
  },
  filterLabel: {
    background: 'white',
  },
  addToCartButton: {
    height: '56px',
  },
});
const Product = () => {
  const classes = useStyles();
  const id = window.location.hash.split('/')[2];
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: {
      id: id,
    },
  });
  const [updateCart] = useMutation(UPDATE_CART);
  const { loading: authLoading, error: authError, data: authData } = useQuery(
    AUTHENTICATE
  );
  const { loading: cartLoading, error: cartError, data: cartData } = useQuery(
    GET_CART,
    {
      variables: {
        username: (authData && authData.me.username) || '',
      },
    }
  );

  const [editProductOpen, setEditProductOpen] = useState(false);
  const [sizeFilter, setSizeFilter] = useState('');

  const handleEditProductClose = () => {
    setEditProductOpen(false);
  };
  const handleSizeFilterChange = (evt) => {
    setSizeFilter(evt.target.value);
  };
  if (productLoading || authLoading || cartLoading) {
    return <div>Loading...</div>;
  }

  let adminPermission = false;
  if (authData) {
    if (authData.me.permission === 'ADMIN') {
      adminPermission = true;
    }
  }
  const {
    name,
    image,
    description,
    price,
    orientation,
    clothingType,
  } = productData.product;
  return (
    <>
      <Container className={classes.productPageWrapper}>
        <h1>Welcome to the product page</h1>
        <h2>Currently Viewing {name}</h2>
        <img src={image} className={classes.productImage} />
        <p>{description}</p>
        <p>Orientation: {orientation}</p>
        <p>Clothing Type: {clothingType}</p>
        <h4>NZD${price}</h4>
        {adminPermission && (
          <Button
            className={classes.editProductButton}
            onClick={() => {
              setEditProductOpen(true);
            }}
            variant="outlined"
          >
            Edit Product
          </Button>
        )}
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="size" className={classes.filterLabel}>
            size
          </InputLabel>
          <Select
            className={classes.filter}
            labelId="size"
            id="size"
            value={sizeFilter}
            onChange={handleSizeFilterChange}
          >
            <MenuItem value="">none</MenuItem>
            <MenuItem value="XS">XS</MenuItem>
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
            <MenuItem value="XXL">XXL</MenuItem>
            <MenuItem value="XL3">3XL</MenuItem>
            <MenuItem value="XL4">4XL</MenuItem>
            <MenuItem value="XL5">5XL</MenuItem>
            <MenuItem value="XL6">6XL</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          className={classes.addToCartButton}
          onClick={async () => {
            const cartProducts = [...cartData.cart.products];
            const newCartProducts = cartProducts.map((product) => {
              return {
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                orientation: product.orientation,
                clothingType: product.clothingType,
                size: product.size,
              };
            });
            await updateCart({
              variables: {
                username: authData.me.username,
                products: [
                  ...newCartProducts,
                  {
                    name,
                    image,
                    description,
                    price,
                    orientation,
                    clothingType,
                    size: sizeFilter,
                  },
                ],
              },
              refetchQueries: [
                {
                  query: GET_CART,
                  variables: {
                    username: authData.me.username,
                  },
                },
              ],
            });
            location.assign('/#/cart');
          }}
        >
          Add to Cart
        </Button>
      </Container>
      <EditProductDialog
        handleEditProductClose={handleEditProductClose}
        editProductOpen={editProductOpen}
        id={id}
      />
    </>
  );
};

export default Product;
