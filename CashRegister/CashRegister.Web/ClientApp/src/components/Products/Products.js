import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { getAllProducts } from "../../redux/actions/productActions";

import ProductsList from "./ProductsList";
import Basket from "./Basket";
import BasketAdd from "./BasketAdd";

import "../../styles/products.css";
import { generateGuid } from "../utils";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsList: [],
      basket: [],
      loading: true,
      selectedProduct: { id: null },
      searchBy: "name",
      searchValue: "",
      displayBasketAdd: false,
      basketCountInput: 0
    };
  }

  componentDidMount() {
    axios.get("api/products/all").then(res => {
      let allProducts = res.data;
      this.setState({
        products: allProducts,
        productsList: allProducts,
        loading: false
      });
    });

    document.onkeydown = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const indexOfSelectedProduct = this.state.productsList.indexOf(
      this.state.selectedProduct
    );

    const productBefore = this.state.productsList[indexOfSelectedProduct - 1];
    const productAfter = this.state.productsList[indexOfSelectedProduct + 1];
    let updatedBasket = JSON.parse(JSON.stringify(this.state.basket));

    switch (key.keyCode) {
      case 38:
        if (productBefore) this.setState({ selectedProduct: productBefore });
        break;

      case 40:
        if (productAfter) this.setState({ selectedProduct: productAfter });
        break;

      case 27:
        this.setState({ displayBasketAdd: false, basketCountInput: 0 });
        break;

      case 13:
        if (!this.state.displayBasketAdd) {
          const basketProduct = this.state.basket.find(
            product => product.id === this.state.selectedProduct.id
          );

          this.setState({
            displayBasketAdd: true,
            basketCountInput: basketProduct
              ? basketProduct.count
              : this.state.basketCountInput
          });
        } else this.handleAddProductToBasket();
        break;

      case 8:
        if (!this.state.displayBasketAdd) {
          updatedBasket = updatedBasket.filter(
            product => this.state.selectedProduct.id !== product.id
          );
          this.setState({ basket: updatedBasket });
        }
        break;
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
    if (this.state.basket.some(product => product.id === product)) {
      const basketProduct = this.state.basket.find(
        product => product.id === product.id
      );

      this.setState({
        selectedProduct: product,
        basketCountInput: basketProduct.count
      });

      this.setState({
        selectedProduct: product
      });
    }

    this.setState({ selectedProduct: product });
  };

  handleSearchMethodChange = event => {
    this.setState({ searchBy: event.target.value });
  };

  handleSearchChange = event => {
    const products = this.state.products;
    let filteredProducts = [];

    if (this.state.searchBy === "name")
      filteredProducts = products.filter(product =>
        product.name.includes(event.target.value)
      );
    else
      products.filter(product => product.barcode.includes(event.target.value));

    const newSelected = filteredProducts.some(
      product => product === this.state.selectedProduct
    )
      ? this.state.selectedProduct
      : { id: -1 };

    this.setState({
      searchValue: event.target.value,
      selectedProduct: newSelected,
      productsList: filteredProducts
    });
  };

  handleCountInputChange = event => {
    this.setState({ basketCountInput: event.target.value });
  };

  handleAddProductToBasket = () => {
    const basketProduct = Object.assign({}, this.state.selectedProduct);

    if (this.state.basketCountInput > basketProduct.count) return;

    basketProduct.count = parseInt(this.state.basketCountInput);

    let basket = JSON.parse(JSON.stringify(this.state.basket));

    if (basket.some(product => product.id === basketProduct.id))
      basket = basket.filter(product => product.id !== basketProduct.id);

    basket.push(basketProduct);

    this.setState({
      basket: basket,
      displayBasketAdd: false,
      basketCountInput: 0
    });
  };

  handlePayment = () => {
    const basket = this.state.basket;
    const dateNow = new Date();
    const receiptId = generateGuid();
    const productReceipts = [];
    basket.forEach(product =>
      productReceipts.push({ productId: product.id, receiptId: receiptId })
    );

    const receipt = {
      id: receiptId,
      date:
        dateNow.getFullYear() +
        "-" +
        (dateNow.getMonth() + 1) +
        "-" +
        dateNow.getDate() +
        " " +
        dateNow.getHours() +
        ":" +
        dateNow.getMinutes() +
        ":" +
        dateNow.getSeconds(),
      productsReceipts: productReceipts,
      priceWithoutTax: 5,
      priceWithTax: 15,
      exciseDutyPrice: 7,
      standardProductsPrice: 8
    };

    axios.get("api/receipts/all").then(res => console.log(res.data));
    axios.post("api/receipts/add", receipt).then(res => console.log(res.data));

    this.setState({ basket: [] });
  };

  render() {
    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList
              loading={this.state.loading}
              products={this.state.productsList}
              selectedProduct={this.state.selectedProduct}
              selectHandler={this.handleSelect}
              searchChangeHandler={this.handleSearchChange}
              searchMethodChangeHandler={this.handleSearchMethodChange}
            />
            <Basket
              basket={this.state.basket}
              paymentHandler={this.handlePayment}
            />
            <BasketAdd
              display={this.state.displayBasketAdd}
              count={this.state.selectedProduct.count}
              addProductToBasketHandler={this.handleAddProductToBasket}
              product={this.state.selectedProduct}
              countInputChangeHandler={this.handleCountInputChange}
              basketCountInput={this.state.basketCountInput}
            />
          </div>
        </main>
        <Link to="products/add">Add</Link>
        <Link to={`products/edit/${this.state.selectedProduct.id}`}>Edit</Link>
      </div>
    );
  }
}

export default Products;
