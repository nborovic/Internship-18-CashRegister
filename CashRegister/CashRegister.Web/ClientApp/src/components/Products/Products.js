import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      basketCountValue: 0
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
    const { basket } = this.state;

    const basketToExport = JSON.parse(JSON.stringify(basket));
    basketToExport.map(product => (product.count = -product.count));

    if (empty(basket)) return;

    const basketId = generateGuid();

    const productBaskets = basket.map(product => ({
      productId: product.id,
      basketId: basketId
    }));

    const dateNow = new Date();

    const prices = this.calculatePrices(basket);

    const receiptToAdd = {
      id: basketId,
      date: formatDate(dateNow),
      productsBaskets: productBaskets,
      priceWithoutTax: prices.priceWithoutTax,
      priceWithTax: prices.priceWithTax,
      exciseDutyPrice: prices.exciseDutyPrice,
      standardProductsPrice: prices.standardProductsPrice
    };

    axios.post("api/products/import-export", basketToExport);

    axios
      .post("api/receipts/add", receiptToAdd)
      .then(res => console.log(res.data));

    const receipt = new printd();
    receipt.print(this.basket.current);

    this.setState({ basket: [] });
  };

  render() {
    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList />
            <Basket basket={this.state.basket} ref={this.basket} />

            <ProductToBasket
              display={this.state.displayProductToBasketWindow}
              product={this.props.selectedProduct}
              addProductTobasketHandler={this.handleAddProductTobasket}
              countInputChangeHandler={this.handleCountInputChange}
              basketCountValue={this.state.basketCountValue}
              ref={this.countInput}
            />
            <button onClick={e => this.handlePayment()}>Checkout</button>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedItem
});

export default connect(
  mapStateToProps,
  {}
)(Products);
