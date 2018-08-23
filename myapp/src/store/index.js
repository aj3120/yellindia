
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducers from "../reducers/combineReducers";
import axios from 'axios';
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routermiddleware = routerMiddleware(history);

export const store = createStore(reducers, applyMiddleware(logger, routermiddleware));
export const apiClient = axios.create({
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'x-www-form-urlencoded',
  },  
});
