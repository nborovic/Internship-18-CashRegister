import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import printd from "printd";
import lodash from "lodash";

import { connect } from "react-redux";
import {
  getAllProducts,
  getProductsByName
} from "../../redux/actions/productActions";

import ProductsList from "./ProductsList";
import Basket from "./Basket";
import BasketAdd from "./BasketAdd";

import "../../styles/products.css";
import { generateGuid, formatDate, empty } from "../utils";

const _ = require("lodash");

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [],
      selectedProduct: { id: null },
      searchBy: "name",
      searchValue: "",
      displayBasketAdd: false,
      basketCountValue: 0
    };

    this.basket = React.createRef();
  }

  componentDidMount() {
    this.props.getAllProducts();
    this.props.getProductsByName("");

    document.onkeydown = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const indexOfSelectedProduct = this.props.productsByName.indexOf(
      this.state.selectedProduct
    );

    const productBefore = this.props.productsByName[indexOfSelectedProduct - 1];
    const productAfter = this.props.productsByName[indexOfSelectedProduct + 1];
    let updatedBasket = JSON.parse(JSON.stringify(this.state.basket));

    switch (key.keyCode) {
      case 38:
        if (productBefore) this.setState({ selectedProduct: productBefore });
        console.log(this.basket.current);
        break;

      case 40:
        if (productAfter) this.setState({ selectedProduct: productAfter });
        break;

      case 27:
        this.setState({ displayBasketAdd: false, basketCountValue: 0 });
        break;

      case 13:
        if (!this.state.displayBasketAdd) {
          const basketProduct = this.state.basket.find(
            product => product.id === this.state.selectedProduct.id
          );

          this.setState({
            displayBasketAdd: true,
            basketCountValue: basketProduct
              ? basketProduct.count
              : this.state.basketCountValue
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
        basketCountValue: basketProduct.count
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
    const searchValue = event.target.value;
    const products = this.props.allProducts;

    if (event.target.value.length < 3) {
      if (products.length !== this.props.productsByName.length)
        this.props.getProductsByName("");
      return;
    }

    this.props.getProductsByName(searchValue).then(data => {
      const { payload } = data;

      const newSelected = payload.some(
        product => product === this.state.selectedProduct
      )
        ? this.state.selectedProduct
        : { id: -1 };

      this.setState({
        searchValue: searchValue,
        selectedProduct: newSelected
      });
    });
  };

  handleCountInputChange = event => {
    this.setState({ basketCountValue: event.target.value });
  };

  handleAddProductToBasket = () => {
    const basketProduct = Object.assign({}, this.state.selectedProduct);

    if (this.state.basketCountValue > basketProduct.count) return;

    basketProduct.count = parseInt(this.state.basketCountValue);

    let basket = JSON.parse(JSON.stringify(this.state.basket));

    if (basket.some(product => product.id === basketProduct.id))
      basket = basket.filter(product => product.id !== basketProduct.id);

    basket.push(basketProduct);

    this.setState({
      basket: basket,
      displayBasketAdd: false,
      basketCountValue: 0
    });
  };

  calculatePrices = basket => {
    let priceWithoutTax = 0;
    let priceWithTax = 0;
    let exciseDutyPrice = 0;
    let standardProductsPrice = 0;

    basket.forEach(product => {
      priceWithoutTax += product.price * product.count;
      priceWithTax +=
        (product.price + (product.price * product.taxRate) / 100) *
        product.count;
      exciseDutyPrice +=
        product.taxRate === 5
          ? (product.price + (product.price * product.taxRate) / 100) *
            product.count
          : 0;
      standardProductsPrice +=
        product.taxRate === 25
          ? (product.price + (product.price * product.taxRate) / 100) *
            product.count
          : 0;
    });

    return {
      priceWithoutTax,
      priceWithTax,
      exciseDutyPrice,
      standardProductsPrice
    };
  };

  handlePayment = () => {
    const basket = this.state.basket;

    if (empty(basket)) return;

    const receiptId = generateGuid();

    const productReceipts = basket.map(product => ({
      productId: product.id,
      receiptId: receiptId
    }));

    const dateNow = new Date();

    const prices = this.calculatePrices(basket);

    const receipt = {
      id: receiptId,
      date: formatDate(dateNow),
      productsReceipts: productReceipts,
      priceWithoutTax: prices.priceWithoutTax,
      priceWithTax: prices.priceWithTax,
      exciseDutyPrice: prices.exciseDutyPrice,
      standardProductsPrice: prices.standardProductsPrice
    };

    axios.post("api/receipts/add", receipt).then(res => console.log(res.data));

    const receiptt = new printd();
    receiptt.print(this.basket.current);

    this.setState({ basket: [] });
  };

  render() {
    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList
              products={this.props.productsByName}
              productsLoading={this.props.productsByNameLoading}
              selectedProduct={this.state.selectedProduct}
              selectHandler={this.handleSelect}
              searchChangeHandler={this.handleSearchChange}
              searchMethodChangeHandler={this.handleSearchMethodChange}
            />
            <Basket
              basket={this.state.basket}
              paymentHandler={this.handlePayment}
              calculatePrices={this.calculatePrices}
              ref={this.basket}
            />
            <BasketAdd
              display={this.state.displayBasketAdd}
              product={this.state.selectedProduct}
              addProductToBasketHandler={this.handleAddProductToBasket}
              countInputChangeHandler={this.handleCountInputChange}
              basketCountValue={this.state.basketCountValue}
            />
          </div>
        </main>
        <Link to="products/add">Add</Link>
        <Link to={`products/edit/${this.state.selectedProduct.id}`}>Edit</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allProducts: state.products.allItems,
  allProductsLoading: state.products.allItemsLoading,
  productsByName: state.products.itemsByName,
  productsByNameLoading: state.products.itemsByNameLoading
});

const mapDispatchToProps = {
  getAllProducts,
  getProductsByName
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
