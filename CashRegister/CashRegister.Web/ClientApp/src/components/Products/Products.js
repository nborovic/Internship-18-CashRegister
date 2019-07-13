import React, { Component } from "react";
import axios from "axios";
import printd from "printd";

import { connect } from "react-redux";

import ProductsList from "./ProductsList";
import Basket from "./Basket";
import ProductToBasket from "./ProductToBasket";

import "../../styles/products.css";
import { generateGuid, formatDate, empty } from "../utils";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [],
      displayProductToBasketWindow: false,
      basketCountValue: 0,
      dateOfIssue: formatDate(new Date())
    };

    this.basket = React.createRef();
    this.countInput = React.createRef();
  }

  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const { selectedProduct } = this.props;
    const {
      displayProductToBasketWindow,
      basketCountValue,
      basket
    } = this.state;

    switch (key.keyCode) {
      case 8:
        if (!displayProductToBasketWindow) {
          const updatedBasket = basket.filter(
            product => selectedProduct.id !== product.id
          );
          this.setState({ basket: updatedBasket });
        }
        break;

      case 13:
        if (!displayProductToBasketWindow) {
          const basketProduct = basket.find(
            product => product.id === selectedProduct.id
          );

          this.setState({
            displayProductToBasketWindow: true,
            basketCountValue: basketProduct
              ? basketProduct.count
              : basketCountValue
          });

          this.countInput.current.focus();
        } else this.handleAddProductToBasket();
        break;

      case 27:
        this.setState({
          displayProductToBasketWindow: false,
          basketCountValue: 0
        });
        break;
    }
  };

  handleCountInputChange = event => {
    this.setState({ basketCountValue: event.target.value });
  };

  handleAddProductToBasket = () => {
    const { selectedProduct } = this.props;
    const { basket, basketCountValue } = this.state;

    const basketProduct = Object.assign({}, selectedProduct);
    let updatedBasket = JSON.parse(JSON.stringify(basket));

    if (basketCountValue > basketProduct.count) return;

    basketProduct.count = parseInt(basketCountValue);

    if (updatedBasket.some(product => product.id === basketProduct.id))
      updatedBasket = updatedBasket.filter(
        product => product.id !== basketProduct.id
      );

    updatedBasket.push(basketProduct);

    this.setState({
      basket: updatedBasket,
      displayProductToBasketWindow: false,
      basketCountValue: 0
    });
  };

  calculatePrices = () => {
    const { basket } = this.state;

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
    const { basket } = this.state;

    const basketToExport = JSON.parse(JSON.stringify(basket));
    basketToExport.map(product => (product.count = -product.count));

    if (empty(basket)) return;

    const receiptId = generateGuid();

    const productBaskets = basket.map(product => ({
      productId: product.id,
      receiptId: receiptId,
      count: product.count
    }));

    const dateNow = new Date();

    const prices = this.calculatePrices();

    const receiptToAdd = {
      id: receiptId,
      date: formatDate(dateNow),
      cashierId: localStorage.getItem("user"),
      productsBaskets: productBaskets,
      priceWithoutTax: prices.priceWithoutTax,
      priceWithTax: prices.priceWithTax,
      exciseDutyPrice: prices.exciseDutyPrice,
      standardProductsPrice: prices.standardProductsPrice
    };

    axios
      .post("api/receipts/add", receiptToAdd)
      .then(() => axios.post("api/products/import-export", basketToExport))
      .catch(err => alert(err));

    this.setState({ dateOfIssue: formatDate(new Date()) });

    const receipt = new printd();
    receipt.print(this.basket.current);

    this.setState({ basket: [] });
  };

  render() {
    const prices = this.calculatePrices();

    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList />

            <div className="basket">
              <h2>Basket</h2>
              <div ref={this.basket}>
                <Basket basket={this.state.basket} />
                <p>
                  Cashier: {this.props.cashier.firstName}{" "}
                  {this.props.cashier.lastName}
                </p>
                <p>Date of issue: {this.state.dateOfIssue}</p>
                <p>Price with tax: {prices.priceWithTax}kn</p>
                <p>Price without tax: {prices.priceWithoutTax}kn</p>
                <p>Standard products price: {prices.standardProductsPrice}kn</p>
                <p>Excise duty price: {prices.exciseDutyPrice}kn</p>
              </div>
              <button onClick={e => this.handlePayment()}>Checkout</button>
            </div>
            <ProductToBasket
              display={this.state.displayProductToBasketWindow}
              product={this.props.selectedProduct}
              addProductTobasketHandler={this.handleAddProductTobasket}
              countInputChangeHandler={this.handleCountInputChange}
              basketCountValue={this.state.basketCountValue}
              ref={this.countInput}
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedItem,
  cashier: state.cashiers.selectedItem
});

export default connect(
  mapStateToProps,
  {}
)(Products);
