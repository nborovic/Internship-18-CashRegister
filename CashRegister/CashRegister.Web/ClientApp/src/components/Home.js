import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/menu.css";

class Home extends Component {
  handleLogout = () => {
    localStorage.removeItem("user");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="menu">
        <h1>Cash Register</h1>
        <button className="menu__item">
          <Link to="products">Products</Link>
        </button>
        <button className="menu__item">
          <Link to="receipts">Receipts</Link>
        </button>
        <button className="menu__item">
          <Link to="products/import">Import</Link>
        </button>
        <button onClick={e => this.handleLogout()}>Logout</button>
      </div>
    );
  }
}

export default connect()(Home);
