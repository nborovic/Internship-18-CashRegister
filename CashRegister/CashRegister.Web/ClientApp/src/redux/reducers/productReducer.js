import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_NAME
} from "../actions/types";

const initialState = {
  allItems: [],
  allItemsLoading: true,
  itemsByName: [],
  itemsByNameLoading: true,
  selectedItem: {
    id: 0,
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
        allItems: action.payload,
        allItemsLoading: false
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        selectedItem: action.payload
      };
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        itemsByName: action.payload,
        itemsByNameLoading: false
      };
    default:
      return state;
  }
}
