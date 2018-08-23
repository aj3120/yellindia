import { combineReducers } from "redux";
import home_products_reducer from './home_products_reducer';
import cart_products_reducer from './cart_products_reducer'
import all_products_reducer from './all_products_reducer';
export default combineReducers({home_products_reducer,all_products_reducer,cart_products_reducer});