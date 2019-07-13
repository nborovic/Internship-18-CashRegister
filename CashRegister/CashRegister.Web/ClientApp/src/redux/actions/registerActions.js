import { GET_ALL_REGISTERS, GET_REGISTER_BY_ID } from "./types";
import axios from "axios";

export const getAllRegisters = () => dispatch => {
  axios.get("api/registers/all").then(res =>
    dispatch({
      type: GET_ALL_REGISTERS,
      payload: res.data
    })
  );
};

export const getRegisterById = id => dispatch => {
  axios.get(`api/registers/get-by-id/${id}`).then(res =>
    dispatch({
      type: GET_REGISTER_BY_ID,
      payload: res.data
    })
  );
};
