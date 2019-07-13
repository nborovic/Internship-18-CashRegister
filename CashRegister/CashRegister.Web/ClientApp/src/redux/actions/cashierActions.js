import { GET_ALL_CASHIERS, GET_CASHIER_BY_ID } from "./types";
import axios from "axios";

export const getAllCashiers = () => dispatch => {
  axios.get("api/cashiers/all").then(res =>
    dispatch({
      type: GET_ALL_CASHIERS,
      payload: res.data
    })
  );
};

export const getCashierById = id => dispatch => {
  axios.get(`api/cashiers/get-by-id/${id}`).then(res =>
    dispatch({
      type: GET_CASHIER_BY_ID,
      payload: res.data
    })
  );
};
