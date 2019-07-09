import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductsList from "./ProductsList";
import AddProduct from "./AddProduct";
import Basket from "./Basket";

import "../../styles/products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      basket: [],
      loading: true,
      selectedProduct: { id: null }
    };
  }

  componentDidMount() {
    axios.get("api/products/all").then(res => {
      let allProducts = res.data;
      this.setState({ products: allProducts, loading: false });
    });

    document.onkeyup = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const indexOfSelectedProduct = this.state.products.indexOf(
      this.state.selectedProduct
    );

    const productBefore = this.state.products[indexOfSelectedProduct - 1];
    const productAfter = this.state.products[indexOfSelectedProduct + 1];

    switch (key.keyCode) {
      case 38:
        if (productBefore) this.setState({ selectedProduct: productBefore });
        break;

      case 40:
        if (productAfter) this.setState({ selectedProduct: productAfter });
        break;

      case 13:
        const updatedBasket = JSON.parse(JSON.stringify(this.state.basket));
        updatedBasket.push(this.state.selectedProduct);
        this.setState({ basket: updatedBasket });
    }
  };

  addProduct = () => {
    axios.post("api/products/add", {
      name: "hi",
      barcode: "3fb18215-5726-4367-bb18-05a2931afe11",
      price: 5.0,
      taxRate: 4.0,
      count: 21
    });
  };

  handleSelect = product => {
    this.setState({ selectedProduct: product });
    console.log(product);
  };

  render() {
    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList
              loading={this.state.loading}
              products={this.state.products}
              selectedProduct={this.state.selectedProduct}
              selectHandler={this.handleSelect}
            />
            <Basket basket={this.state.basket} />
          </div>
        </main>
        <AddProduct />
        <Link to={`products/edit/${this.state.selectedProduct.id}`}>Edit</Link>
      </div>
    );
  }
}

export default Products;
