import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_FILTERED_PRODUCTS
} from "./types";

export const getAllProducts = () => async dispatch => {
  return await axios
    .get("api/products/all")
    .then(res => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
};

export const getProductsByName = name => async dispatch => {
  return await axios
    .get(`api/products/get-by-name?name=${name}`)
    .then(res => dispatch({ type: GET_FILTERED_PRODUCTS, payload: res.data }));
};

export const getProductsByBarcode = barcode => dispatch => {
  axios
    .get(`api/products/get-by-barcode?barcode=${barcode}`)
    .then(res => dispatch({ type: GET_FILTERED_PRODUCTS, payload: res.data }));
};

export const getProductById = id => async dispatch => {
  return await axios.get(`api/products/get-by-id/${id}`).then(res =>
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data
    })
  );
};
