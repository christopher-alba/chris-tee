import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT, AUTHENTICATE } from '../ApolloClient/queries';
import Button from '@material-ui/core/Button';
import EditProductDialog from '../components/editProductDialog';

const Product = () => {
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
      <div>
        <h1>welcome to the product page</h1>
        <h2>{name}</h2>
        <img src={image} />
        <p>{description}</p>
        <p>Orientation: {orientation}</p>
        <p>Clothing Type: {clothingType}</p>
        <h4>NZD${price}</h4>
        {adminPermission && (
          <Button
            onClick={() => {
              setEditProductOpen(true);
            }}
          >
            Edit Product
          </Button>
        )}
      </div>
      <EditProductDialog
        handleEditProductClose={handleEditProductClose}
        editProductOpen={editProductOpen}
        id={id}
      />
    </>
  );
};

export default Product;
