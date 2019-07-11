import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/menu.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["products", "receipts"],
      selectedOption: ""
    };
  }

  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
  }

  handleKeyPress = key => {
    const indexOfSelectedOption = this.state.options.indexOf(
      this.state.selectedOption
    );

    console.log(this.state.selectedOption);

    const optionBefore = this.state.options[indexOfSelectedOption - 1];
    const optionAfter = this.state.options[indexOfSelectedOption + 1];

    switch (key.keyCode) {
      case 38:
        if (indexOfSelectedOption !== 0)
          this.setState({ selectedOption: optionBefore });
        break;
      case 40:
        if (indexOfSelectedOption < this.state.options.length - 1)
          this.setState({ selectedOption: optionAfter });
        break;
      case 13:
        if (indexOfSelectedOption >= 0)
          this.props.history.push(`/${this.state.selectedOption}`);
    }
  };

  render() {
    return (
      <div className="menu">
        <h1>Cash Register</h1>
        <button
          className={`menu__item ${
            this.state.selectedOption === "products"
              ? "menu__item--selected"
              : ""
          }`}
        >
          <Link to="products">Products</Link>
        </button>
        <button
          className={`menu__item ${
            this.state.selectedOption === "receipts"
              ? "menu__item--selected"
              : ""
          }`}
        >
          <Link to="receipts">Receipts</Link>
        </button>
      </div>
    );
  }
}

export default connect()(Home);
