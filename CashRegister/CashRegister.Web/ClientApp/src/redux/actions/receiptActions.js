import {
  GET_ALL_RECEIPTS,
  GET_RECEIPT_BY_ID,
  GET_RECEIPTS_BY_DATE,
  GET_SLICED_RECEIPTS
} from "./types";
import axios from "axios";

export const getAllReceipts = () => dispatch => {
  console.log("je");
  axios
    .get("api/receipts/all")
    .then(res => dispatch({ type: GET_ALL_RECEIPTS, payload: res.data }));
};

export const getReceiptById = id => dispatch => {
  axios
    .get(`api/receipts/get-by-id/${id}`)
    .then(res => dispatch({ type: GET_RECEIPT_BY_ID, payload: res.data }));
};

export const getSlicedReceipts = (amount, beginningIndex) => dispatch => {
  console.log("je");
  axios
    .get(
      `api/receipts/sliced?amount=${amount}&beginningIndex=${beginningIndex}`
    )
    .then(res => {
      dispatch({
        type: GET_SLICED_RECEIPTS,
        payload: res.data
      });
    });
};

export const getReceiptsByDate = (
  amount,
  beginningIndex,
  dateAsString
) => dispatch => {
  axios
    .get(
      `api/receipts/sliced?amount=${amount}&beginningIndex=${beginningIndex}&dateAsString=${dateAsString}`
    )
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_SLICED_RECEIPTS,
        payload: res.data
      });
    });
};
