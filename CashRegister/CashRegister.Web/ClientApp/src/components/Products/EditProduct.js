import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { connect } from "react-redux";
import { getProductById } from "../../redux/actions/productActions";

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
  product: state.product.selectedItem
});

const mapDispatchToProps = {
  getProductById
};

const EnhancedForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => {
    const id = parseInt(props.match.params.id);

    if (props.product.id !== id) props.getProductById(id);
    console.log(
      props.product.name,
      props.product.barcode,
      props.product.price,
      props.product.taxRate,
      props.product.count
    );

    return {
      name: props.product.name,
      barcode: props.product.barcode,
      price: props.product.price,
      taxRate: props.product.taxRate,
      count: props.product.count
    };
  },

  validationSchema: Yup.object().shape({
    barcode: Yup.string()
      .required()
      .test("is-guid", "Barcode must be guid value", value =>
        validateGuid(value)
      ),
    price: Yup.number().required("Price is required"),
    taxRate: Yup.number()
      .min(0, "Tax rate must be between 0 and 100")
      .max(100, "Tax rate must be between 0 and 100")
      .required("Tax rate is required")
  }),

  handleSubmit: (values, { props }) => {
    const editedProduct = {
      id: props.product.id,
      name: props.product.name,
      barcode: values.barcode,
      price: values.price,
      taxRate: values.taxRate,
      count: props.product.count
    };

    axios
      .post("api/products/edit", editedProduct)
      .then(props.history.push("/products"))
      .catch(err => alert(err));
  }
})(EditProduct);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
