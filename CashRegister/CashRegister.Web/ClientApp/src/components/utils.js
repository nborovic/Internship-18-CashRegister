import lodash from "lodash";

export const debounce = require("lodash/debounce");

export const validateGuid = require("uuid-validate");

export const generateGuid = require("uuid/v4");

export const formatDate = date => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    Math.round(date.getSeconds())
  );
};

export const empty = array => {
  return !array.some(element => element);
};
