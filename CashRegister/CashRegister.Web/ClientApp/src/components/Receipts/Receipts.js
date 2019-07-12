import React, { Component } from "react";
import axios from "axios";

class Receipts extends Component {
  componentDidMount = () => {
    axios.get("api/receipts/all").then(res => console.log(res.data));
  };

  render() {
    return <div>Test</div>;
  }
}

export default Receipts;
