import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getSlicedReceipts,
  getReceiptsByDate
} from "../../redux/actions/receiptActions";
import { formatDate } from "../utils";

import ReceiptsList from "./ReceiptsList";

const receiptsPerPage = 2;
class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInputValue: ""
    };
  }

  componentDidMount() {
    this.props.getSlicedReceipts(receiptsPerPage, 0);
  }

  handleDateInputChange = event => {
    if (event.target.value === "") {
      this.props.getSlicedReceipts(receiptsPerPage, 0);
      return;
    }

    const date = formatDate(new Date(event.target.value));

    this.props.getReceiptsByDate(receiptsPerPage, 0, date);

    this.setState({ dateInputValue: date });
  };

  handlePageDecrement = () => {
    if (this.props.page === 1) return;

    if (this.props.dateInputValue === "")
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage - receiptsPerPage * 2
      );
    else
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage - receiptsPerPage * 2,
        this.props.dateInputValue
      );
  };

  handlePageIncrement = () => {
    if (this.props.page === this.props.totalPages) return;

    if (this.props.dateInputValue === "")
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage
      );
    else
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage,
        this.props.dateInputValue
      );
  };

  render() {
    return (
      <div>
        <input type="date" onChange={e => this.handleDateInputChange(e)} />

        <ReceiptsList
          receipts={this.props.slicedReceipts}
          receiptsPerPage={this.props.receiptsPerPage}
          receiptsLoading={this.props.slicedReceiptsLoading}
          totalPages={this.props.totalPages}
          pageIncrementHandler={this.handlePageIncrement}
          pageDecrementHandler={this.handlePageDecrement}
          page={this.props.page}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  slicedReceipts: state.receipts.slicedItems,
  slicedReceiptsLoading: state.receipts.slicedItemsLoading,
  totalPages: state.receipts.totalPages,
  page: state.receipts.page
});

const mapDispatchToProps = {
  getSlicedReceipts,
  getReceiptsByDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipts);
