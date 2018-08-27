import { combineReducers } from "redux";
import home_products_reducer from './home_products_reducer';
import cart_products_reducer from './cart_products_reducer'
import all_products_reducer from './all_products_reducer';
import checkout_details_reducer from './checkout_details_reducer'
import login_reducer from './login_reducer';
import {routerReducer } from 'react-router-redux'
export default combineReducers({home_products_reducer,all_products_reducer,
                                cart_products_reducer,login_reducer,checkout_details_reducer,routing:routerReducer})