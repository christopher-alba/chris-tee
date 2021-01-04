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
