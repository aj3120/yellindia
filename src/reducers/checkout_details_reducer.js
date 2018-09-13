const checkout_details_reducer = (state = {}, action) => {
    switch (action.type) {
          case "ADD_ADDRESS":
                return ({ ...state, address: action.data });
          case "PAYMENT_DETAILS_ADD":
                return({...state, payment_details: action.data })
          case "PAYMENT_MODE":
            return ({...state,payment_mode:action.data})      
          default:
                return (state);
    }
}

export default checkout_details_reducer;