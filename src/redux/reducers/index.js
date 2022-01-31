import userReducer from "./user";
import { combineReducers } from "redux";
import cartReducer from "./cart";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,

});
