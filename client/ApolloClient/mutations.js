import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!){
        login(username: $username, password: $password){
            token
        }
    }
`
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!){
        deleteProduct(id: $id)
    }
`