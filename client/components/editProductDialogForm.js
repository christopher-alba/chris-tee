import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../components/dialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { GET_PRODUCTS, GET_PRODUCT } from '../ApolloClient/queries';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
  editProductForm: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
  },
  editProductFormInput: {
    marginBottom: '20px',
  },
  filterLabel: {
    background: 'white',
    padding: '5px',
  },
});

const EditProductDialogForm = ({
  handleEditProductClose,
  editProductOpen,
  id,
  editProduct,
  product,
}) => {
  console.log(product);
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    validateOnMount: true,
    initialValues: {
      ...product,
      imageUrl: product.image,
      orientation: product.orientation.toLowerCase(),
      clothingType: product.clothingType.toLowerCase(),
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number()
        .required('Price is required')
        .typeError('Price must be a valid number'),
      description: Yup.string().required('Description is required'),
      imageUrl: Yup.string().required('Image URL is required'),
      clothingType: Yup.string().required('Clothing type is required'),
      orientation: Yup.string().required('Orientation is required'),
    }),
  });

  return (
    <Dialog onClose={handleEditProductClose} open={editProductOpen}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleEditProductClose}
      >
        Edit a product
      </DialogTitle>
      <form className={classes.editProductForm}>
        <TextField
          name="name"
          value={values.name}
          label="name"
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={handleChange}
        />
        <TextField
          name="price"
          value={values.price}
          label="price"
          variant="outlined"
          className={classes.editProductFormInput}
          type="number"
          onChange={handleChange}
        />
        <TextField
          name="description"
          value={values.description}
          label="description"
          multiline={true}
          rowsMax={4}
          rows={4}
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={handleChange}
        />
        <TextField
          name="imageUrl"
          value={values.imageUrl}
          label="image url"
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={handleChange}
        />
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="clothing-type" className={classes.filterLabel}>
            Clothing type
          </InputLabel>
          <Select
            name="clothingType"
            labelId="clothing-type"
            id="clothing-type"
            value={values.clothingType}
            className={classes.editProductFormInput}
            onChange={handleChange}
          >
            <MenuItem value="tshirt">t-shirts</MenuItem>
            <MenuItem value="shorts">shorts</MenuItem>
            <MenuItem value="pants">pants</MenuItem>
            <MenuItem value="jacket">jackets</MenuItem>
            <MenuItem value="underwear">underwear</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="orientation" className={classes.filterLabel}>
            Orientation
          </InputLabel>
          <Select
            name="orientation"
            labelId="orientation"
            id="orientation"
            value={values.orientation}
            className={classes.editProductFormInput}
            onChange={handleChange}
          >
            <MenuItem value="feminine">feminine</MenuItem>
            <MenuItem value="masculine">masculine</MenuItem>
            <MenuItem value="unisex">unisex</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => {
            editProduct({
              variables: {
                id: id,
                name: values.name,
                price: Number(values.price),
                description: values.description,
                orientation: values.orientation.toUpperCase(),
                clothingType: values.clothingType.toUpperCase(),
                image: values.imageUrl,
              },
              refetchQueries: [{ query: GET_PRODUCTS }],
            }).then(() => {
              handleEditProductClose();
            });
          }}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default EditProductDialogForm;
