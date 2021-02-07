import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT } from '../ApolloClient/queries';
import { EDIT_PRODUCT } from '../ApolloClient/mutations';
import EditProductDialogForm from '../components/editProductDialogForm'

const EditProductDialog = (props) => {
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: props.id || 'invalidid123',
    },
  });

  if (loading) {
    return <div>loading...</div>
  }

  console.log(props);
  return (
    <EditProductDialogForm product={data.product} {...props} editProduct={editProduct}/>
  )

 
};

export default EditProductDialog;
