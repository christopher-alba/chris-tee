const searchbar = (state = { searchterm: "" }, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_STRING":
      return {
        searchString: action.payload,
      };
    default:
      return state;
  }
};

export default searchbar;