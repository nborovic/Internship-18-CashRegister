import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { connect } from "react-redux";
import {
  getProductById,
  getAllProducts
} from "../../redux/actions/productActions";

const validateGuid = require("uuid-validate");

const generateGuid = require("uuid/v4");

const EditProduct = ({
  handleSubmit,
  errors,
  touched,
  isSubmitting,
  setFieldValue
}) => {
  return (
    <Form className="products__edit-form">
      <label className="edit-form__label" htmlFor="name">
        Name:
      </label>
      <Field
        className="edit-form__input edit-form__input--readonly"
        type="text"
        name="name"
        placeholder="Name"
        readOnly
      />

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

      <label className="edit-form__label" htmlFor="price">
        Price:
      </label>
      <Field
        className="edit-form__input"
        type="number"
        name="price"
        placeholder="Price"
      />
      {touched.price && errors.price && (
        <p className="edit-form__error">{errors.price}</p>
      )}

      <label className="edit-form__label" htmlFor="taxRate">
        Tax rate:
      </label>
      <Field
        className="edit-form__input"
        type="number"
        name="taxRate"
        placeholder="Tax rate"
      />
      {touched.taxRate && errors.taxRate && (
        <p className="edit-form__error">{errors.taxRate}</p>
      )}

      <label className="edit-form__label" htmlFor="count">
        Count:
      </label>
      <Field
        className="edit-form__input edit-form__input--readonly"
        type="number"
        name="count"
        placeholder="count"
        readOnly
      />

      <button
        className="edit-form__submit"
        type="submit"
        disabled={isSubmitting}
        onClick={e => handleSubmit()}
      >
        Submit
      </button>
    </Form>
  );
};

const mapStateToProps = state => ({
  products: state.products.items,
  product: state.product.item
});

const mapDispatchToProps = {
  getProductById,
  getAllProducts
};

const EnhancedForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => {
    const { id } = props.match.params;

    if (props.product.id !== parseInt(id)) props.getProductById(id);

    return {
      name: props.product.id ? props.product.name : "",
      barcode: props.product.id ? props.product.barcode : "",
      price: props.product.id ? props.product.price : "",
      taxRate: props.product.id ? props.product.taxRate : "",
      count: props.product.id ? props.product.count : ""
    };
  },

  validationSchema: Yup.object().shape({
    barcode: Yup.string()
      .required()
      .test("is-guid", "Barcode must be guid value", value =>
        validateGuid(value)
      ),
    price: Yup.number().required("Price is required"),
    taxRate: Yup.number().required("Tax rate is required")
  }),

  handleSubmit: (values, { resetForm, props }) => {
    console.log(props.product);
    // axios.post("api/products/edit", editedProduct).then(resetForm);
  }
})(EditProduct);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
