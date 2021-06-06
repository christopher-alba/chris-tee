import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../components/dialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../ApolloClient/queries";
import { CREATE_PRODUCT } from "../ApolloClient/mutations";

const useStyles = makeStyles({
  createProductForm: {
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    width: "500px",
  },
  createProductFormInput: {
    marginBottom: "20px",
  },
  filterLabel: {
    background: "white",
    padding: "5px",
  },
});
const CreateProductDialog = ({
  handleCreateProductClose,
  createProductOpen,
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [clothingType, setClothingType] = useState("");
  const [orientation, setOrientation] = useState("");
  const [createProduct] = useMutation(CREATE_PRODUCT);
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
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        />
        <TextField
          label="price"
          variant="outlined"
          className={classes.createProductFormInput}
          type="number"
          onChange={(evt) => {
            setPrice(evt.target.value);
          }}
        />
        <TextField
          label="description"
          multiline={true}
          rowsMax={4}
          rows={4}
          variant="outlined"
          className={classes.createProductFormInput}
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
        />
        <Box className="fileDisplayArea"></Box>
        <TextField
          type="file"
          variant="outlined"
          className={classes.createProductFormInput}
          onChange={(evt) => {
            const file = evt.target.files[0];
           
            var imageType = /image.*/;
            
            const fileDisplayArea =
              document.getElementsByClassName("fileDisplayArea")[0];
            if (file.type.match(imageType)) {
              var reader = new FileReader();
              reader.onload = function (e) {
                fileDisplayArea.innerHTML = "";

                // Create a new image.
                var img = new Image();
                // Set the img src property using the data URL.
                img.src = reader.result;
                setImageUrl(reader.result);
                // Add the image to the page.
                fileDisplayArea.appendChild(img);
              };

              reader.readAsDataURL(file);
            } else {
              fileDisplayArea.innerHTML = "File not supported!";
            }
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
            className={classes.createProductFormInput}
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
            className={classes.createProductFormInput}
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
            createProduct({
              variables: {
                name: name,
                price: Number(price),
                description: description,
                orientation: orientation.toUpperCase(),
                clothingType: clothingType.toUpperCase(),
                image: imageUrl,
              },
              refetchQueries: [{ query: GET_PRODUCTS }],
            }).then(() => {
              handleCreateProductClose();
            });
          }}
        >
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateProductDialog;
