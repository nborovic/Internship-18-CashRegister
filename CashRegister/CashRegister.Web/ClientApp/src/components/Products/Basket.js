import React from "react";
import { empty } from "../utils";

const Basket = props => {
  const { basket } = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Basket;
