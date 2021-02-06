import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../components/dialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../ApolloClient/queries';
import { CREATE_PRODUCT } from '../ApolloClient/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
  createProductForm: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
  },
  createProductFormInput: {
    marginBottom: '20px',
  },
  filterLabel: {
    background: 'white',
    padding: '5px',
  },
});
const CreateProductDialog = ({
  handleCreateProductClose,
  createProductOpen,
}) => {
  const classes = useStyles();
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const { values, touched, errors, handleChange, handleBlur } = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      price: null,
      description: '',
      imageUrl: '',
      clothingType: '',
      orientation: '',
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
    <Dialog onClose={handleCreateProductClose} open={createProductOpen}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleCreateProductClose}
      >
        Create a new product
      </DialogTitle>
      <form className={classes.createProductForm}>
        {Boolean(touched.name && errors.name) && <div>{errors.name}</div>}
        <TextField
          name="name"
          label="name"
          variant="outlined"
          className={classes.createProductFormInput}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          error={Boolean(touched.name && errors.name)}
        />
        {Boolean(touched.price && errors.price) && <div>{errors.price}</div>}
        <TextField
          name="price"
          label="price"
          variant="outlined"
          className={classes.createProductFormInput}
          type="number"
          onChange={handleChange}
          value={values.price}
          onBlur={handleBlur}
          error={Boolean(touched.price && errors.price)}
        />
        {Boolean(touched.description && errors.description) && (
          <div>{errors.description}</div>
        )}
        <TextField
          name="description"
          label="description"
          multiline={true}
          rowsMax={4}
          rows={4}
          variant="outlined"
          className={classes.createProductFormInput}
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
          error={Boolean(touched.description && errors.description)}
        />
        {Boolean(touched.imageUrl && errors.imageUrl) && (
          <div>{errors.imageUrl}</div>
        )}
        <TextField
          name="imageUrl"
          label="image url"
          variant="outlined"
          className={classes.createProductFormInput}
          onChange={handleChange}
          value={values.imageUrl}
          onBlur={handleBlur}
          error={Boolean(touched.imageUrl && errors.imageUrl)}
        />
        {Boolean(touched.clothingType && errors.clothingType) && (
          <div>{errors.clothingType}</div>
        )}
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="clothing-type" className={classes.filterLabel}>
            Clothing type
          </InputLabel>
          <Select
            name="clothingType"
            labelId="clothing-type"
            id="clothing-type"
            value={values.clothingType}
            className={classes.createProductFormInput}
            onChange={handleChange}
            value={values.clothingType}
            onBlur={handleBlur}
            error={Boolean(touched.clothingType && errors.clothingType)}
          >
            <MenuItem value="tshirt">t-shirts</MenuItem>
            <MenuItem value="shorts">shorts</MenuItem>
            <MenuItem value="pants">pants</MenuItem>
            <MenuItem value="jacket">jackets</MenuItem>
            <MenuItem value="underwear">underwear</MenuItem>
          </Select>
        </FormControl>
        {Boolean(touched.orientation && errors.orientation) && (
          <div>{errors.orientation}</div>
        )}
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="orientation" className={classes.filterLabel}>
            Orientation
          </InputLabel>
          <Select
            name="orientation"
            labelId="orientation"
            id="orientation"
            value={values.orientation}
            className={classes.createProductFormInput}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.orientation && errors.orientation)}
          >
            <MenuItem value="feminine">feminine</MenuItem>
            <MenuItem value="masculine">masculine</MenuItem>
            <MenuItem value="unisex">unisex</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => {
            createProduct({
              variables: {
                name: values.name,
                price: Number(values.price),
                description: values.description,
                orientation: values.orientation.toUpperCase(),
                clothingType: values.clothingType.toUpperCase(),
                image: values.imageUrl,
              },
              refetchQueries: [{ query: GET_PRODUCTS }],
            }).then(() => {
              handleCreateProductClose();
            });
          }}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateProductDialog;
