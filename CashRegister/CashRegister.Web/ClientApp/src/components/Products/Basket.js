import React from "react";

const Basket = props => (
  <div className="basket">
    <h2 className="basket__title">Basket</h2>
    {props.basket
      ? props.basket.map((product, index) => (
          <div key={index} className="products-list__product">
            <p>
              {product.name} | {product.price}kn | {product.count}
            </p>
          </div>
        ))
      : null}
    <button onClick={() => props.paymentHandler()}>Payment</button>
  </div>
);

export default Basket;
