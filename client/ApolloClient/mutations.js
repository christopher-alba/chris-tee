import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $price: Float!
    $description: String!
    $image: String!
    $orientation: Orientation!
    $clothingType: ClothingType!
  ) {
    createProduct(
      product: {
        name: $name
        price: $price
        description: $description
        image: $image
        orientation: $orientation
        clothingType: $clothingType
      }
    ) {
      id
    }
  }
`;
