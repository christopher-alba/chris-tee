import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, AUTHENTICATE } from "../ApolloClient/queries";
import { useLocation } from "react-router-dom";
import { DELETE_PRODUCT } from "../ApolloClient/mutations";
import CreateProductDialog from "../components/createProductDialog";
import EditProductDialog from "../components/editProductDialog";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  filterContainerWrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "10px 20px",
    border: "1px solid lightgray",
    borderRadius: "0.5rem",
  },
  filter: {
    width: "150px",
  },
  filterTitle: {
    marginRight: "100px",
  },
  filterWrapper: {
    marginRight: "50px",
  },
  shopTitle: {
    marginTop: "100px",
    marginBottom: "10px",
  },
  shopSubTitle: {
    marginTop: "0px",
    fontWeight: 200,
  },
  filterLabel: {
    background: "white",
  },
  setFilterButton: {
    height: "56px",
    padding: "0 20px 0 20px",
    background: "black",
    marginLeft: "auto",
    color: "white",
    "&:hover": {
      background: "#2e2e2e",
    },
  },
  productsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  product: {
    width: "270px",
    overflow: "hidden",
    position: "relative",
    margin: "0 auto",
    marginTop: "10px",
    padding: "15px",
  },
  productLabel: {},
  pageSelectorWrapper: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageNumber: {
    letterSpacing: 5,
    fontWeight: 200,
  },
  adminControls: {
    border: "1px solid lightgray",
    padding: "10px",
    borderRadius: "0.5rem",
  },
  adminControlButton: {
    marginRight: "10px",
  },
  visitProduct: {
    position: "absolute",
    right: "15px",
    bottom: "15px",
  },
  productImage: {
    width: "270px",
    margin: "0 auto",
  },
  productImageWrapper: {
    height: "270px",
    overflow: "hidden",
  },
}));

const Shop = (props) => {
  let categoryTitle = "ALL";
  const searchParams = useLocation().search;
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const {
    loading: authLoading,
    error: authError,
    data: authData,
  } = useQuery(AUTHENTICATE);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [currentPage, setCurrentPage] = useState(1);
  const [lowerCount, setLowerCount] = useState(0);
  const [upperCount, setUpperCount] = useState(8);
  const [products, setProducts] = useState([]);
  const [emptyResults, setEmptyResults] = useState(false);
  const [basicFilter, setBasicFilter] = useState("");
  const [clothingTypeFilter, setClothingTypeFilter] = useState("");
  const [orientationFilter, setOrientationFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);

  useEffect(() => {
    console.log(props);
    if (!emptyResults && data) {
      setProducts(data.products);
    }
    if (searchParams.includes("masculine") && data) {
      setProducts(
        data.products.filter((product) => {
          if (product.orientation === "MASCULINE") {
            return true;
          }
          return false;
        })
      );
    } else if (searchParams.includes("feminine") && data) {
      setProducts(
        data.products.filter((product) => {
          if (product.orientation === "FEMININE") {
            return true;
          }
          return false;
        })
      );
    } else if (data) {
      console.log(data);
      setProducts(
        data.products.filter((product) => {
          console.log(props);
          return product.name
            .toLowerCase()
            .includes(props.globalSearchTerm.toLowerCase());
        })
      );
    }
  }, [props.globalSearchTerm]);
  if (loading) {
    return <div>loading...</div>;
  }

  if (searchParams.includes("masculine")) {
    categoryTitle = "MASCULINE";
  }
  if (searchParams.includes("feminine")) {
    categoryTitle = "FEMININE";
  }

  let adminPermission = false;
  if (authData) {
    if (authData.me.permission === "ADMIN") {
      adminPermission = true;
    }
  }

  const handleCreateProductClose = () => {
    setCreateProductOpen(false);
  };
  const handleEditProductClose = () => {
    setEditProductOpen(false);
  };
  const handleBasicFilterChange = (evt) => {
    setBasicFilter(evt.target.value);
  };

  const handleClothingTypeFilterChange = (evt) => {
    setClothingTypeFilter(evt.target.value);
  };

  const handleOrientationFilterChange = (evt) => {
    setOrientationFilter(evt.target.value);
  };
  const handleSetFiltersClick = () => {
    setProducts(() => {
      const newProducts = data.products.filter((product) => {
        let activeFilters = 0;
        let matches = 0;
        //check which filters are active
        if (clothingTypeFilter !== "") {
          activeFilters++;
        }
        if (orientationFilter !== "") {
          activeFilters++;
        }
        //check if product matches active filters
        if (product.clothingType === clothingTypeFilter.toUpperCase()) {
          matches++;
        }
        if (product.orientation === orientationFilter.toUpperCase()) {
          matches++;
        }
        //return true only if matched for all active filters
        if (matches === activeFilters) {
          return true;
        }

        return false;
      });

      if (newProducts.length === 0) {
        setEmptyResults(true);
      }

      if (basicFilter === "") {
        return newProducts;
      }

      const orderedProducts = newProducts.sort((a, b) => {
        if (basicFilter === "lowest") {
          return a.price - b.price;
        }
        if (basicFilter === "highest") {
          return b.price - a.price;
        }
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (basicFilter === "a-z") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
        if (basicFilter === "z-a") {
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
        }
      });

      return orderedProducts;
    });
  };

  const totalPages =
    Math.floor(products.length / 8) + (products.length % 8 >= 1);

  const renderedProducts = products.slice(lowerCount, upperCount);

  return (
    <Container>
      <h1 className={classes.shopTitle}>
        {adminPermission ? "ADMIN SHOPPING PAGE" : "SHOPPING PAGE"}
      </h1>
      <h2 className={classes.shopSubTitle}>
        BROWSING {categoryTitle} PRODUCTS
      </h2>
      <Box className={classes.filterContainerWrapper}>
        <h2 className={classes.filterTitle}>FILTERS</h2>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="basic" className={classes.filterLabel}>
            Basic
          </InputLabel>
          <Select
            value={basicFilter}
            className={classes.filter}
            labelId="basic"
            id="basic"
            onChange={handleBasicFilterChange}
          >
            <MenuItem value="">none</MenuItem>
            <MenuItem value="lowest">lowest price</MenuItem>
            <MenuItem value="highest">highest price</MenuItem>
            <MenuItem value="a-z">A-Z</MenuItem>
            <MenuItem value="z-a">Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterWrapper}>
          <InputLabel id="clothing-type" className={classes.filterLabel}>
            Clothing type
          </InputLabel>
          <Select
            className={classes.filter}
            labelId="clothing-type"
            id="clothing-type"
            value={clothingTypeFilter}
            onChange={handleClothingTypeFilterChange}
          >
            <MenuItem value="">none</MenuItem>
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
            className={classes.filter}
            labelId="orientation"
            id="orientation"
            value={orientationFilter}
            onChange={handleOrientationFilterChange}
          >
            <MenuItem value="">none</MenuItem>
            <MenuItem value="feminine">feminine</MenuItem>
            <MenuItem value="masculine">masculine</MenuItem>
            <MenuItem value="unisex">unisex</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          className={classes.setFilterButton}
          onClick={() => {
            location.replace("#/shop");
            handleSetFiltersClick();
            setLowerCount(0);
            setUpperCount(8);
            setCurrentPage(1);
          }}
        >
          Set Filters
        </Button>
      </Box>
      <Box className={classes.pageSelectorWrapper}>
        <Button
          variant="outlined"
          disabled={lowerCount === 0}
          onClick={() => {
            if (lowerCount > 0) {
              setLowerCount(lowerCount - 8);
              setUpperCount(upperCount - 8);
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous Page
        </Button>
        <h4 className={classes.pageNumber}>
          {renderedProducts.length > 0
            ? `Page ${currentPage}/${totalPages}`
            : "No products matched your filters"}
        </h4>
        <Button
          variant="outlined"
          disabled={upperCount >= products.length}
          onClick={() => {
            if (upperCount < products.length) {
              setLowerCount(lowerCount + 8);
              setUpperCount(upperCount + 8);
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next Page
        </Button>
      </Box>
      {adminPermission && (
        <Box className={classes.adminControls}>
          <Button
            variant="outlined"
            className={classes.adminControlButton}
            onClick={() => {
              setCreateProductOpen(true);
            }}
          >
            Create Product
          </Button>
          {selectedProduct && (
            <>
              <Button
                variant="outlined"
                className={classes.adminControlButton}
                onClick={() => {
                  setEditProductOpen(true);
                }}
              >
                Edit Product
              </Button>
              <Button
                variant="outlined"
                className={classes.adminControlButton}
                onClick={() => {
                  deleteProduct({
                    variables: {
                      id: selectedProduct,
                    },
                    refetchQueries: [{ query: GET_PRODUCTS }],
                  });
                }}
              >
                Delete Product
              </Button>
              <Button
                variant="outlined"
                className={classes.adminControlButton}
                onClick={() => {
                  setSelectedProduct("");
                }}
              >
                Deselect Product
              </Button>
            </>
          )}
        </Box>
      )}
      <Box className={classes.productsWrapper}>
        {renderedProducts.map((product) => (
          <Box
            key={product.id}
            className={classes.product}
            onClick={() => {
              adminPermission ? setSelectedProduct(product.id) : "";
            }}
            style={{
              border: product.id === selectedProduct ? "3px solid black" : "",
            }}
          >
            <Box className={classes.productImageWrapper}>
              <img
                src={product.image}
                alt="product"
                className={classes.productImage}
                onError={(image) => {
                  image.target.src =
                    "https://www.k3ma.com/wp-content/uploads/2017/04/default-image.jpg";
                }}
              />
            </Box>
            <Box className={classes.productLabel}>
              <p>{product.name}</p>
              <p>NZD${product.price}</p>
              <Button
                variant="outlined"
                className={classes.visitProduct}
                href={`#/product/${product.id}`}
              >
                Visit
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <CreateProductDialog
        handleCreateProductClose={handleCreateProductClose}
        createProductOpen={createProductOpen}
      />
      <EditProductDialog
        handleEditProductClose={handleEditProductClose}
        editProductOpen={editProductOpen}
        id={selectedProduct}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    globalSearchTerm: state.searchbar.searchString,
  };
};

export default connect(mapStateToProps, undefined)(Shop);
