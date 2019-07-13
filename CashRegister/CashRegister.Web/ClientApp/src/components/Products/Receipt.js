import React from "react";
import { formatDate } from "../utils";

const Receipt = React.forwardRef((props, ref) => {
  const prices = props.calculatePrices(props.receipt);
  return (
    <div className="basket">
      <div className="receipt" ref={ref}>
        <h2 className="basket__title">Receipt</h2>
        {props.receipt
          ? props.receipt.map((product, index) => (
              <div key={index} className="products-list__product">
                <p>
                  Name: {product.name} | Price: {product.price}kn | Tax rate:{" "}
                  {product.taxRate}% | Count: {product.count}
                </p>
              </div>
            ))
          : null}
        <p>Cashier: none</p>
        <p>Date: {formatDate(new Date())}</p>
        <p>Price with tax: {prices.priceWithTax}kn</p>
        <p>Price without tax: {prices.priceWithoutTax}kn</p>
        <p>Excise duty price: {prices.exciseDutyPrice}kn</p>
        <p>Standard products price: {prices.standardProductsPrice}kn</p>
      </div>
      <button onClick={() => props.paymentHandler()}>Checkout</button>
    </div>
  );
});

export default Receipt;
