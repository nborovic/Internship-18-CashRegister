import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProduct = ({ handleSubmit, errors, touched, isSubmitting }) => (
  <Form>
    <Field type="text" name="name" placeholder="Name" />
    {touched.name && errors.name && <p>{errors.name}</p>}
    <Field type="number" name="price" placeholder="Price" />
    {touched.price && errors.price && <p>{errors.price}</p>}
    <Field type="number" name="taxRate" placeholder="Tax rate" />
    {touched.taxRate && errors.taxRate && <p>{errors.taxRate}</p>}
    <Field type="number" name="count" placeholder="Count" />
    {touched.count && errors.count && <p>{errors.count}</p>}
    <button type="submit" disabled={isSubmitting} onClick={e => handleSubmit()}>
      Submit
    </button>
  </Form>
);

export default withFormik({
  mapPropsToValues() {
    return {
      name: "",
      price: "",
      taxRate: "",
      count: ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "Not enough characters (min 2)")
      .max(45, "Too many characters (max 45)")
      .required("Name is required")
      .test("name-exists", "Name already exists", async value => {
        let response = await axios.post("api/products/name-exists", {
          name: value
        });
        return !response.data;
      }),
    price: Yup.number().required("Price is required"),
    taxRate: Yup.number().required("Tax rate is required"),
    count: Yup.number()
      .integer("Count must be integer value")
      .required("Count is required")
  }),

  handleSubmit(values, { resetForm }) {
    const productToAdd = {
      name: values.name,
      barcode: require("uuid/v4"),
      price: values.price,
      taxRate: values.taxRate,
      count: values.count
    };

    axios.post("api/products/add", productToAdd).then(resetForm());
  }
})(AddProduct);
