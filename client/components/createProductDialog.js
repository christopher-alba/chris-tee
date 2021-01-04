import React from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../components/dialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
});
const createProductDialog = ({
  handleCreateProductClose,
  createProductOpen,
}) => {
  const classes = useStyles();
  return (
    <Dialog onClose={handleCreateProductClose} open={createProductOpen}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleCreateProductClose}
      >
        Create a new product
      </DialogTitle>
      <form className={classes.createProductForm}>
        <TextField
          label="name"
          variant="outlined"
          className={classes.createProductFormInput}
        />
        <TextField
          label="price"
          variant="outlined"
          className={classes.createProductFormInput}
          type="number"
        />
        <TextField
          label="description"
          multiline={true}
          rowsMax={4}
          rows={4}
          variant="outlined"
          className={classes.createProductFormInput}
        />

        <Button variant="outlined">Create</Button>
      </form>
    </Dialog>
  );
};

export default createProductDialog;
