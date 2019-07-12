import React from "react";
import { empty } from "../utils";

const ProductsList = props => (
  <div className="products-list">
    <h2>Products</h2>
    <input
      type="text"
      name="search"
      placeholder="Search"
      onChange={e => props.searchChangeHandler(e.target.value)}
    />
    <select onChange={e => props.searchMethodChangeHandler(e)}>
      <option value="name">By name</option>
      <option value="barcode">By barcode</option>
    </select>

    {props.productsLoading ? (
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
    {empty(props.products) ? <p>No results</p> : null}
  </div>
);

export default ProductsList;
