const category_products_reducer = (state = { category_products: null }, action) => {
    switch (action.type) {
          case "ADD_CATEGORY_PRODUCTS":
                return ({ ...state, category_products: action.data });
          default:
                return (state);
    }
}

export default category_products_reducer;