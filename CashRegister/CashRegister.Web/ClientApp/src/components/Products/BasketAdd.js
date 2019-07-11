import React from "react";

const BasketAdd = props => (
  <div
    className={`products__basket-add ${
      props.display ? "products__basket-add--open" : ""
    }`}
  >
    <p>Available: {props.count}</p>
    <input
      type="number"
      name="count"
      placeholder="Count"
      value={props.basketCountInput}
      onChange={e => props.countInputChangeHandler(e)}
    />
    <button type="submit" onClick={e => props.addProductToBasketHandler(e)}>
      Submit
    </button>
  </div>
);

export default BasketAdd;
