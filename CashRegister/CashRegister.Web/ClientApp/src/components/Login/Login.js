import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashierIdInputValue: "",
      registerIdInputValue: ""
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = () => {
    const { cashierIdInputValue, registerIdInputValue } = this.state;

    axios
      .post("api/cashiers/login", {
        cashierId: cashierIdInputValue,
        registerId: registerIdInputValue
      })
      .then(res => {
        localStorage.setItem("user", res.data.cashierId);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        alert("Cashier id and register id don't match!");
      });
  };

  render() {
    return (
      <div>
        <input
          type="number"
          name="cashierIdInputValue"
          placeholder="Cashier Id"
          onChange={e => this.handleInputChange(e)}
        />
        <input
          type="number"
          name="registerIdInputValue"
          placeholder="Register Id"
          onChange={e => this.handleInputChange(e)}
        />
        <button type="submit" onClick={() => this.handleLogin()}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
