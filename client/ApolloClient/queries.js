import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      image
      orientation
      clothingType
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      image
      orientation
      clothingType
    }
  }
`;

export const GET_CART = gql`
  query GetCart($username: String!) {
    cart(username: $username) {
      products {
        id
        name
        price
        description
        image
        orientation
        clothingType
        size
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  query Authenticate {
    me {
      username
      password
      token
      permission
    }
  }
`;
