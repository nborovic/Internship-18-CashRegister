import React, { Component } from "react";
import { connect } from "react-redux";
import { empty } from "../utils";

import ProductsList from "./ProductsList";
import ProductsToBasket from "./ProductToBasket";
import Basket from "./Basket";
import Axios from "axios";

class ImportProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [],
      displayProductToBasketWindow: false,
      basketCountValue: 0
    };

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

  handleImport = () => {
    const { basket } = this.state;

    if (empty(basket)) return;

    Axios.post("api/products/import", basket);
  };

  render() {
    const { handleCountInputChange, countInput } = this;
    const {
      basket,
      displayProductToBasketWindow,
      basketCountValue
    } = this.state;
    const { selectedProduct } = this.props;

    return (
      <div>
        <ProductsList />
        <Basket basket={basket} />
        <ProductsToBasket
          product={selectedProduct}
          display={displayProductToBasketWindow}
          basketCountValue={basketCountValue}
          countInputChangeHandler={handleCountInputChange}
          ref={countInput}
        />
        <button onClick={e => this.handleImport()}>Import</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedItem
});

export default connect(
  mapStateToProps,
  null
)(ImportProducts);
