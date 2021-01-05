import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT, AUTHENTICATE } from '../ApolloClient/queries';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import EditProductDialog from '../components/editProductDialog';
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
  const { loading: authLoading, error: authError, data: authData } = useQuery(
    AUTHENTICATE
  );

  const [editProductOpen, setEditProductOpen] = useState(false);

  const handleEditProductClose = () => {
    setEditProductOpen(false);
  };
  if (productLoading || authLoading) {
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
        <Button variant="outlined">Add to Cart</Button>
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
