import React from "react";

const ReceiptsList = props => (
  <div className="receipts-list">
    {props.receiptsLoading ? (
      <p>Loading...</p>
    ) : (
      props.receipts.map((receipt, index) => (
        <div key={index} className="receipts-list__receipt">
          {receipt.productsReceipts.map((productReceipt, index) => (
            <p key={index}>
              {productReceipt.product.name} | {productReceipt.product.price}kn |{" "}
              {productReceipt.product.taxRate}% | {productReceipt.count}
            </p>
          ))}
          <p>
            Cashier: {receipt.cashier.firstName} {receipt.cashier.lastName}
          </p>
          <p>Date of issue: {receipt.date}</p>
          <p>Price with tax: {receipt.priceWithTax}kn</p>
          <p>Price without tax: {receipt.priceWithoutTax}kn</p>
          <p>Standard products price: {receipt.standardProductsPrice}kn</p>
          <p>Excise duty price: {receipt.exciseDutyPrice}kn</p>
          <p>{receipt.id}</p>
        </div>
      ))
    )}
    <div className="receipts-list__pagination">
      <button onClick={e => props.pageDecrementHandler()}>Before</button>
      <p>
        {props.page} / {props.totalPages}
      </p>
      <button onClick={e => props.pageIncrementHandler()}>Next</button>
    </div>
  </div>
);

export default ReceiptsList;
