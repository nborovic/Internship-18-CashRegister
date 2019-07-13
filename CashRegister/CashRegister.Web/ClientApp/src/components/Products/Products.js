import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import printd from "printd";

import { connect } from "react-redux";
import {
  getAllProducts,
  getProductsByName
} from "../../redux/actions/productActions";

import ProductsList from "./ProductsList";
import Receipt from "./Receipt";
import ProductToReceipt from "./ProductToReceipt";

import "../../styles/products.css";
import { generateGuid, formatDate, empty } from "../utils";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: [],
      displayProductToReceiptWindow: false,
      receiptCountValue: 0
    };

    this.receipt = React.createRef();
    this.countInput = React.createRef();
  }

  componentDidMount() {
    this.props.getAllProducts();
    this.props.getProductsByName("");

    document.onkeydown = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const { selectedProduct } = this.props;
    const {
      displayProductToReceiptWindow,
      receiptCountValue,
      receipt
    } = this.state;

    switch (key.keyCode) {
      case 8:
        if (!displayProductToReceiptWindow) {
          const updatedReceipt = receipt.filter(
            product => selectedProduct.id !== product.id
          );
          this.setState({ receipt: updatedReceipt });
        }
        break;

      case 13:
        if (!displayProductToReceiptWindow) {
          const receiptProduct = receipt.find(
            product => product.id === selectedProduct.id
          );

          this.setState({
            displayProductToReceiptWindow: true,
            receiptCountValue: receiptProduct
              ? receiptProduct.count
              : receiptCountValue
          });

          this.countInput.current.focus();
        } else this.handleAddProductToReceipt();
        break;

      case 27:
        this.setState({
          displayProductToReceiptWindow: false,
          receiptCountValue: 0
        });
        break;
    }
  };

  handleCountInputChange = event => {
    this.setState({ receiptCountValue: event.target.value });
  };

  handleAddProductToReceipt = () => {
    const receiptProduct = Object.assign({}, this.props.selectedProduct);

    if (this.state.receiptCountValue > receiptProduct.count) return;

    receiptProduct.count = parseInt(this.state.receiptCountValue);

    let receipt = JSON.parse(JSON.stringify(this.state.receipt));

    if (receipt.some(product => product.id === receiptProduct.id))
      receipt = receipt.filter(product => product.id !== receiptProduct.id);

    receipt.push(receiptProduct);

    this.setState({
      receipt: receipt,
      displayProductToReceiptWindow: false,
      receiptCountValue: 0
    });
  };

  calculatePrices = receipt => {
    let priceWithoutTax = 0;
    let priceWithTax = 0;
    let exciseDutyPrice = 0;
    let standardProductsPrice = 0;

    receipt.forEach(product => {
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
    const receipt = this.state.receipt;

    if (empty(receipt)) return;

    const receiptId = generateGuid();

    const productReceipts = receipt.map(product => ({
      productId: product.id,
      receiptId: receiptId
    }));

    const dateNow = new Date();

    const prices = this.calculatePrices(receipt);

    const receiptToAdd = {
      id: receiptId,
      date: formatDate(dateNow),
      productsReceipts: productReceipts,
      priceWithoutTax: prices.priceWithoutTax,
      priceWithTax: prices.priceWithTax,
      exciseDutyPrice: prices.exciseDutyPrice,
      standardProductsPrice: prices.standardProductsPrice
    };

    axios
      .post("api/receipts/add", receiptToAdd)
      .then(res => console.log(res.data));

    const receiptt = new printd();
    receiptt.print(this.receipt.current);

    this.setState({ receipt: [] });
  };

  render() {
    return (
      <div>
        <main>
          <div className="products-wrapper">
            <ProductsList />
            <Receipt
              receipt={this.state.receipt}
              paymentHandler={this.handlePayment}
              calculatePrices={this.calculatePrices}
              ref={this.receipt}
            />

            <ProductToReceipt
              display={this.state.displayProductToReceiptWindow}
              product={this.props.selectedProduct}
              addProductToreceiptHandler={this.handleAddProductToreceipt}
              countInputChangeHandler={this.handleCountInputChange}
              receiptCountValue={this.state.receiptCountValue}
              ref={this.countInput}
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedItem
});

const mapDispatchToProps = {
  getAllProducts,
  getProductsByName
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
