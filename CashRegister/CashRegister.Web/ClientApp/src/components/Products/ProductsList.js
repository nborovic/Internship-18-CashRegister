import React, { Component } from "react";
import { empty } from "../utils";
import { connect } from "react-redux";
import {
  getAllProducts,
  getProductsByName,
  getProductById,
  getProductsByBarcode
} from "../../redux/actions/productActions";
import { debounce } from "../utils";
import { Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      searchBy: "name"
    };
  }

  componentDidMount = () => {
    this.props.getAllProducts();
    this.props.getProductsByName("");

    window.onkeydown = this.handleKeyDown;
  };

  handleKeyDown = key => {
    const { filteredProducts, selectedProduct, getProductById } = this.props;

    const selectedProductReference = filteredProducts.find(
      product => product.id === selectedProduct.id
    );

    const indexOfSelectedProduct = filteredProducts.indexOf(
      selectedProductReference
    );

    switch (key.keyCode) {
      case 38:
        const productBefore = filteredProducts[indexOfSelectedProduct - 1];
        if (productBefore === undefined) return;
        getProductById(productBefore.id);
        break;

      case 40:
        const productAfter = filteredProducts[indexOfSelectedProduct + 1];
        if (productAfter === undefined) return;
        getProductById(productAfter.id);
        break;
    }
  };

  handleSearchInputChange = debounce(searchValue => {
    const {
      allProducts,
      filteredProducts,
      getProductsByName,
      getProductsByBarcode
    } = this.props;

    if (searchValue.length < 3) {
      if (allProducts.length !== filteredProducts.length)
        this.state.searchBy === "name"
          ? getProductsByName("")
          : getProductsByBarcode("");
      return;
    }

    if (this.state.searchBy === "name") getProductsByName(searchValue);
    else getProductsByBarcode(searchValue);

    this.setState({
      searchValue: searchValue
    });
  }, 1000);

  handleSearchByChange = event => {
    this.setState({ searchBy: event.target.value });
  };

  render() {
    const { handleSearchInputChange, handleSearchByChange } = this;
    const {
      filteredProductsLoading,
      filteredProducts,
      selectedProduct
    } = this.props;

    return (
      <div className="products-list">
        <h2>Products</h2>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={e => handleSearchInputChange(e.target.value)}
        />
        <select onChange={e => handleSearchByChange(e)}>
          <option value="name">By name</option>
          <option value="barcode">By barcode</option>
        </select>

        {filteredProductsLoading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              key={index}
              className={`products-list__product ${
                product.id === selectedProduct.id
                  ? "products-list__product--selected"
                  : ""
              }`}
            >
              <p>
                {product.id} | {product.name} | {product.price}kn |{" "}
                {product.taxRate}% | {product.barcode}
              </p>
            </div>
          ))
        )}
        {empty(filteredProducts) ? <p>No results</p> : null}
        <Link to="/products/add">Add</Link>
        {selectedProduct.id === 0 ? null : (
          <Link to={`/products/edit/${selectedProduct.id}`}>Edit</Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allProducts: state.products.allItems,
  filteredProducts: state.products.filteredItems,
  filteredProductsLoading: state.products.filteredItemsLoading,
  selectedProduct: state.products.selectedItem
});

const mapDispatchTopProps = {
  getAllProducts,
  getProductsByName,
  getProductById,
  getProductsByBarcode
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(ProductsList);
