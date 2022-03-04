import { combineReducers, compose, createStore } from "redux";
import AuthReducer from "../redux/reducers/authReducer";
import coinDBReducer from "../redux/reducers/coinDBReducer";
import websiteDBReducer from "./reducers/websiteDBReducer";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combineReducer = combineReducers({
  AuthReducer,
  coinDBReducer,
  websiteDBReducer,
});

const store = createStore(
  combineReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
