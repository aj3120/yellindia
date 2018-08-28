const reviewReducer=(state={reviews:null},action)=>{
    switch(action.type){
        case "GET_REVIEW":
            return({...state,reviews:action.data})

        default    :
            return({...state})

    }
}
export default reviewReducer;