import React from "react";
import { Route } from "react-router";
import { Provider } from "react-redux";

import Home from "./components/Home";
import Products from "./components/Products/Products";
import EditProduct from "./components/Products/EditProduct";
import AddProduct from "./components/Products/AddProduct";
import Receipts from "./components/Receipts/Receipts";
import ProductsList from "./components/Products/ProductsList";

import "./styles/common.css";

const App = () => (
  <React.Fragment>
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/products/add" component={AddProduct} />
    <Route
      exact
      path="/products/edit/:id"
      render={props => <EditProduct {...props} />}
    />
    <Route exact path="/receipts" component={Receipts} />
    <Route exact path="/products-list" component={ProductsList} />
  </React.Fragment>
);

export default App;
