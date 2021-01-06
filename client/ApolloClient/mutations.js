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

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: ID!
    $name: String!
    $price: Float!
    $description: String!
    $image: String!
    $orientation: Orientation!
    $clothingType: ClothingType!
  ) {
    updateProduct(
      product: {
        id: $id
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

export const UPDATE_CART = gql`
  mutation UpdateCart(
    $name: String
    $price: Float
    $description: String
    $image: String
    $orientation: Orientation
    $clothingType: ClothingType
    $username: String!
    $size: ClothingSizes
  ) {
    updateCart(
      username: $username
      products: [
        {
          name: $name
          price: $price
          description: $description
          image: $image
          orientation: $orientation
          clothingType: $clothingType
          size: $size
        }
      ]
    ) {
      products {
        id
      }
    }
  }
`;
