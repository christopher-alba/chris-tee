import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AUTHENTICATE, GET_CART } from '../ApolloClient/queries';
import { UPDATE_CART } from '../ApolloClient/mutations';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
const Cart = () => {
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

  const [selectedProduct, setSelectedProduct] = useState('');
  const [updateCart] = useMutation(UPDATE_CART);
  if (authLoading || cartLoading) {
    return <div>Loading...</div>;
  }
  const { products } = cartData.cart;
  return (
    <Box>
      <h1>Welcome to your Cart {authData.me.username}</h1>
      {products.length > 0 && (
        <Button
          onClick={() => {
            updateCart({
              variables: {
                username: authData.me.username,
                products: [],
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
          }}
        >
          Clear your cart
        </Button>
      )}
      {selectedProduct && (
        <>
          <Button
            onClick={() => {
              setSelectedProduct('');
            }}
          >
            Deselect product
          </Button>
          <Button
            onClick={() => {
              const updatedProducts = products.filter((product) => {
                return product.id !== selectedProduct;
              });
              const newCartProducts = updatedProducts.map((product) => {
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
              updateCart({
                variables: {
                  username: authData.me.username,
                  products: [...newCartProducts],
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
              setSelectedProduct('');
            }}
          >
            remove from cart
          </Button>
        </>
      )}
      {products.map((product) => {
        const {
          id,
          name,
          description,
          image,
          orientation,
          price,
          clothingType,
          size,
        } = product;
        return (
          <Box
            key={id}
            onClick={() => {
              setSelectedProduct(id);
            }}
            style={{ border: selectedProduct === id ? '3px solid black' : '' }}
          >
            <h2>{name}</h2>
            <p>{description}</p>
            <img
              src={image}
              alt="product"
              onError={(image) => {
                image.target.src =
                  'https://www.k3ma.com/wp-content/uploads/2017/04/default-image.jpg';
              }}
            />
            <p>Orientation: {orientation}</p>
            <p>Clothing Type: {clothingType}</p>
            <p>Size: {size}</p>
            <h2>NZD${price}</h2>
          </Box>
        );
      })}
    </Box>
  );
};

export default Cart;
