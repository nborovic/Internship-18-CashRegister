import React from "react";
import { empty } from "../utils";

const Basket = React.forwardRef((props, ref) => {
  const { basket } = props;

  return (
    <div className="basket" ref={ref}>
      <h2 className="basket__title">Basket</h2>
      {empty(basket) ? (
        <p>No results</p>
      ) : (
        props.basket.map((product, index) => (
          <div key={index} className="products-list__product">
            <p>
              Name: {product.name} | Price: {product.price}kn | Tax rate:{" "}
              {product.taxRate}% | Count: {product.count}
            </p>
          </div>
        ))
      )}
    </div>
  );
});

export default Basket;
