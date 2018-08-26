const checkout_details_reducer = (state = { cart_products: null }, action) => {
    switch (action.type) {
          case "ADD_ADDRESS":
                return ({ ...state, address: action.data });
          default:
                return (state);
    }
}

export default checkout_details_reducer;