import {
  GET_ALL_RECEIPTS,
  GET_RECEIPT_BY_ID,
  GET_RECEIPTS_BY_DATE,
  GET_SLICED_RECEIPTS
} from "../actions/types";

const initialValues = {
  allItems: [],
  allItemsLoading: true,
  slicedItems: [],
  slicedItemsLoading: true,
  page: 0,
  totalPages: 0,
  selectedItem: {}
};

export default function(state = initialValues, action) {
  switch (action.type) {
    case GET_ALL_RECEIPTS:
      return {
        ...state,
        allItems: action.payload,
        allItemsLoading: false
      };
    case GET_RECEIPT_BY_ID:
      return {
        ...state,
        selectedItem: action.payload
      };
    case GET_RECEIPTS_BY_DATE:
      return {
        ...state
      };
    case GET_SLICED_RECEIPTS:
      return {
        ...state,
        slicedItems: action.payload.item1,
        slicedItemsLoading: false,
        page: action.payload.item2,
        totalPages: action.payload.item3
      };
    default:
      return state;
  }
}
