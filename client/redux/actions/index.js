export const updateSearchString = (string) => {
  return {
    type: "UPDATE_SEARCH_STRING",
    payload: string,
  };
};
