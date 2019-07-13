import { combineReducers } from "redux";
import productReducer from "./productReducer";
import receiptReducer from "./receiptReducer";
import cashierReducer from "./cashierReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  products: productReducer,
  receipts: receiptReducer,
  cashiers: cashierReducer,
  registers: registerReducer
});
