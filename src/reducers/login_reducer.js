const LoginReducer=(state={login_details:{status:false}},action)=>{
    switch(action.type){
        case "LOGIN":
            return({...state,login_details:action.data})
        case "LOGOUT":
            return({...state,login_details:action.data})    
        default    :
            return({...state})

    }
}
export default LoginReducer;