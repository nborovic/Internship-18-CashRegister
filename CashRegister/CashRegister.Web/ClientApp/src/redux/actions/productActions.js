import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "./types";

export const getAllProducts = () => dispatch => {
  axios
    .get("api/products/all")
    .then(res => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
};

export const getProductById = id => dispatch => {
  console.log("hej");
  axios.get(`api/products/get-by-id/${id}`).then(res =>
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data
    })
  );
};
