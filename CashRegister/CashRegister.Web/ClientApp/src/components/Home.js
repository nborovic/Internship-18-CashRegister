import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = props => (
  <div>
    <h1>Cash Register</h1>
    <Link to="products">Products</Link>
  </div>
);

export default connect()(Home);
