import React, { Component } from "react";
import { empty } from "../utils";
import { connect } from "react-redux";
import {
  getAllProducts,
  getProductsByName,
  getProductById
} from "../../redux/actions/productActions";
import { debounce } from "../utils";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      searchByName: true,
      searchByBarcode: false
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
      selectedProduct,
      getProductsByName
    } = this.props;

    if (searchValue.length < 3) {
      if (allProducts.length !== filteredProducts.length) getProductsByName("");
      return;
    }

    getProductsByName(searchValue);

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
                {product.id} | {product.name} | {product.price}
              </p>
            </div>
          ))
        )}
        {empty(filteredProducts) ? <p>No results</p> : null}
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
  getProductById
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(ProductsList);
