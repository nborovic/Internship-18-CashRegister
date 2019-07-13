import { GET_ALL_CASHIERS, GET_CASHIER_BY_ID } from "../actions/types";

const initialValues = {
  allItems: [],
  allItemsLoading: true,
  selectedItem: {}
};

export default function(state = initialValues, action) {
  switch (action.type) {
    case GET_ALL_CASHIERS:
      return {
        ...state,
        allItems: action.payload,
        allItemsLoading: false
      };
    case GET_CASHIER_BY_ID:
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
}
