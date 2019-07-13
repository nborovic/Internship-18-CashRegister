import React from "react";

const ProductToBasket = React.forwardRef((props, ref) => {
  const {
    product,
    display,
    countInputChangeHandler,
    addProductToReceiptHandler,
    basketCountValue
  } = props;

  return (
    <div
      className={`products__basket-add ${
        display ? "products__basket-add--open" : ""
      }`}
    >
      <p>{product.name}</p>
      <p>Available: {product.count}</p>
      <input
        type="number"
        name="count"
        placeholder="Count"
        value={basketCountValue}
        onChange={e => countInputChangeHandler(e)}
        ref={ref}
      />
      <button type="submit" onClick={e => addProductToReceiptHandler(e)}>
        Submit
      </button>
    </div>
  );
});

export default ProductToBasket;
