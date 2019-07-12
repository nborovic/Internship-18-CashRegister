import React from "react";

const Basket = React.forwardRef((props, ref) => {
  const prices = props.calculatePrices(props.basket);
  return (
    <div className="basket" ref={ref}>
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
      <p>Price with tax: {prices.priceWithTax}kn</p>
      <p>Price without tax: {prices.priceWithoutTax}kn</p>
      <p>Excise duty price: {prices.exciseDutyPrice}kn</p>
      <p>Standard products price: {prices.standardProductsPrice}kn</p>
    </div>
  );
});

export default Basket;
