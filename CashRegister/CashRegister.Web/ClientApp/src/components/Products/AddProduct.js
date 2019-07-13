import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../styles/products.css";

import { validateGuid, generateGuid } from "../utils";

const AddProduct = ({
  handleSubmit,
  errors,
  touched,
  isSubmitting,
  setFieldValue
}) => (
  <Form className="product__edit-form">
    <Field type="text" name="name" placeholder="Name" />
    {touched.name && errors.name && <p>{errors.name}</p>}
    <label className="edit-form__label" htmlFor="barcode">
      Barcode:
    </label>
    <Field
      className="edit-form__input"
      type="text"
      name="barcode"
      placeholder="Barcode"
    />
    {touched.barcode && errors.barcode && (
      <p className="edit-form__error">{errors.barcode}</p>
    )}
    <span
      className="edit-form__gen-barcode"
      onClick={() => setFieldValue("barcode", generateGuid())}
    >
      Generate barcode
    </span>
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
      count: "",
      barcode: ""
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
    barcode: Yup.string()
      .required()
      .test("is-guid", "Barcode must be guid value", value =>
        validateGuid(value)
      ),
    price: Yup.number().required("Price is required"),
    taxRate: Yup.number()
      .min(0, "Tax rate must be between 0 and 100")
      .max(100, "Tax rate must be between 0 and 100")
      .required("Tax rate is required"),
    count: Yup.number()
      .integer("Count must be integer value")
      .required("Count is required")
  }),

  handleSubmit(values, { resetForm }) {
    const productToAdd = {
      name: values.name,
      barcode: values.barcode,
      price: values.price,
      taxRate: values.taxRate,
      count: values.count
    };

    axios.post("api/products/add", productToAdd).then(resetForm());
  }
})(AddProduct);
