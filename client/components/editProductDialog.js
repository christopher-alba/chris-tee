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
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT } from '../ApolloClient/queries';
import { EDIT_PRODUCT } from '../ApolloClient/mutations';

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
const EditProductDialog = ({ handleEditProductClose, editProductOpen, id }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [orientation, setOrientation] = useState('');
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: id || 'invalidid123',
    },
  });

  useEffect(() => {
    if (data) {
      const { product } = data;
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImageUrl(product.image);
      setClothingType(product.clothingType.toLowerCase());
      setOrientation(product.orientation.toLowerCase());
    }
  }, [data, editProductOpen]);

  if (loading) {
    return <div>loading...</div>;
  }

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
          value={name}
          label="name"
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        />
        <TextField
          value={price}
          label="price"
          variant="outlined"
          className={classes.editProductFormInput}
          type="number"
          onChange={(evt) => {
            setPrice(evt.target.value);
          }}
        />
        <TextField
          value={description}
          label="description"
          multiline={true}
          rowsMax={4}
          rows={4}
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
        />
        <TextField
          value={imageUrl}
          label="image url"
          variant="outlined"
          className={classes.editProductFormInput}
          onChange={(evt) => {
            setImageUrl(evt.target.value);
          }}
        />
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="clothing-type" className={classes.filterLabel}>
            Clothing type
          </InputLabel>
          <Select
            labelId="clothing-type"
            id="clothing-type"
            value={clothingType}
            className={classes.editProductFormInput}
            onChange={(evt) => {
              setClothingType(evt.target.value);
            }}
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
            labelId="orientation"
            id="orientation"
            value={orientation}
            className={classes.editProductFormInput}
            onChange={(evt) => {
              setOrientation(evt.target.value);
            }}
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
                name: name,
                price: Number(price),
                description: description,
                orientation: orientation.toUpperCase(),
                clothingType: clothingType.toUpperCase(),
                image: imageUrl,
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

export default EditProductDialog;
