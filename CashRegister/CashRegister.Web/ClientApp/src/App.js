import React from "react";
import { Route } from "react-router";
import { Provider } from "react-redux";

import Home from "./components/Home";
import Products from "./components/Products/Products";
import EditProduct from "./components/Products/EditProduct";

import "./styles/common.css";

const App = () => (
  <React.Fragment>
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={Products} />
    <Route
      exact
      path="/products/edit/:id"
      render={props => <EditProduct {...props} />}
    />
  </React.Fragment>
);

export default App;
