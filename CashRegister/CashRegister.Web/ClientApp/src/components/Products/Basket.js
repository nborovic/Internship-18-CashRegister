import React from "react";

const Basket = props => (
  <div className="basket">
    <h2 className="basket__title">Basket</h2>
    {props.basket
      ? props.basket.map((product, index) => (
          <div key={index} className="products-list__product">
            <p>
              {product.id} | {product.name} | {product.price}
            </p>
          </div>
        ))
      : null}
  </div>
);

export default Basket;
