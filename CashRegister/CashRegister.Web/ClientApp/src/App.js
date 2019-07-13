import React from "react";
import { Route } from "react-router";

import Home from "./components/Home";
import Products from "./components/Products/Products";
import EditProduct from "./components/Products/EditProduct";
import AddProduct from "./components/Products/AddProduct";
import Receipts from "./components/Receipts/Receipts";
import ImportProducts from "./components/Products/ImportProducts";
import Login from "./components/Login/Login";

const App = () => (
  <React.Fragment>
    {localStorage.getItem("user") ? (
      <Route exact path="/" component={Home} />
    ) : (
      <Route exact path="/" component={Login} />
    )}

    <Route exact path="/products" component={Products} />
    <Route exact path="/products/add" component={AddProduct} />
    <Route
      exact
      path="/products/edit/:id"
      render={props => <EditProduct {...props} />}
    />
    <Route exact path="/receipts" component={Receipts} />
    <Route exact path="/products/import" component={ImportProducts} />
  </React.Fragment>
);

export default App;
