import React from "react";

const ProductsList = props => (
  <div className="products-list">
    <h2>Products</h2>

    {props.loading ? (
      <p>Loading...</p>
    ) : (
      props.products.map((product, index) => (
        <div
          key={index}
          className={`products-list__product ${
            product === props.selectedProduct
              ? "products-list__product--selected"
              : ""
          }`}
          onClick={e => props.selectHandler(product)}
        >
          <p>
            {product.id} | {product.name} | {product.price}
          </p>
        </div>
      ))
    )}
  </div>
);

export default ProductsList;
