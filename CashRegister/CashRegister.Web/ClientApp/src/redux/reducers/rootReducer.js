import { combineReducers } from "redux";
import productReducer from "./productReducer";
import receiptReducer from "./receiptReducer";

export default combineReducers({
  products: productReducer,
  receipts: receiptReducer
});
