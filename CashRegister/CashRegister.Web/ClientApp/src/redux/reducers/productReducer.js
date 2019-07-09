import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "../actions/types";

const initialState = {
  items: [],
  item: {
    id: null,
    name: "",
    barcode: "",
    price: 0,
    taxRate: 0,
    count: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        items: action.payload
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
