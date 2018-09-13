const search_products_reducer = (state = { search_products: null }, action) => {
    switch (action.type) {
          case "SEARCH_PRODUCTS":
                return ({ ...state, search_products: action.data });
          default:
                return (state);
    }
}

export default search_products_reducer;