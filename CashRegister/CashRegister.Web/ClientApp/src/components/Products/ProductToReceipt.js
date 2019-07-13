import React from "react";

const ProductToReceipt = React.forwardRef((props, ref) => (
  <div
    className={`products__basket-add ${
      props.display ? "products__basket-add--open" : ""
    }`}
  >
    <p>{props.product.name}</p>
    <p>Available: {props.product.count}</p>
    <input
      type="number"
      name="count"
      placeholder="Count"
      value={props.receiptCountValue}
      onChange={e => props.countInputChangeHandler(e)}
      ref={ref}
    />
    <button type="submit" onClick={e => props.addProductToReceiptHandler(e)}>
      Submit
    </button>
  </div>
));

export default ProductToReceipt;
