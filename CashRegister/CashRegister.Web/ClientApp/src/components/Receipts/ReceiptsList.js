import React from "react";

const ReceiptsList = props => (
  <div className="receipts-list">
    {props.receiptsLoading ? (
      <p>Loading...</p>
    ) : (
      props.receipts.map((receipt, index) => (
        <div key={index} className="receipts-list__receipt">
          <p>
            {receipt.priceWithoutTax} | {receipt.priceWithTax}
          </p>
          <p>{receipt.id}</p>
        </div>
      ))
    )}
    <button onClick={e => props.pageDecrementHandler()}>Before</button>
    <p>
      {props.page} / {props.totalPages}
    </p>
    <button onClick={e => props.pageIncrementHandler()}>Next</button>
  </div>
);

export default ReceiptsList;
