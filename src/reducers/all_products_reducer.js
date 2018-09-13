const all_products_reducer = (state = { all_products: null }, action) => {
    switch (action.type) {
          case "ADD_ALL_PRODUCTS":
                return ({ ...state, all_products: action.data });
          default:
                return (state);
    }
}

export default all_products_reducer;