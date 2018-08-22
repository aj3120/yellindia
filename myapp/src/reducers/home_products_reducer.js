const home_products_reducer = (state = { home_products: null }, action) => {
    switch (action.type) {
          case "ADD_HOME_PRODUCTS":
                return ({ ...state, home_products: action.data });
          default:
                return (state);
    }
}

export default home_products_reducer;