import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT, AUTHENTICATE } from '../ApolloClient/queries';
const Product = () => {
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: {
      id: window.location.hash.split('/')[2],
    },
  });
  if (productLoading) {
    return <div>Loading...</div>;
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
    <div>
      <h1>welcome to the product page</h1>
      <h2>{name}</h2>
      <img src={image} />
      <p>{description}</p>
      <p>Orientation: {orientation}</p>
      <p>Clothing Type: {clothingType}</p>
      <h4>NZD${price}</h4>
    </div>
  );
};

export default Product;
