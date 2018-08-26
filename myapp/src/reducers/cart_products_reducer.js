const cart_products_reducer = (state = { cart_products: null }, action) => {
    switch (action.type) {
          case "SHOW_CART_PRODUCTS":
                return ({ ...state, cart_products: action.data });
          case "CHANGE_PRODUCT_COUNT":
                return ({ ...state, cart_products:action.data });
          case "TOTAL_PRICE":
                return ({...state,total_price:action.data})
          default:
                return (state);
    }
}

export default cart_products_reducer;