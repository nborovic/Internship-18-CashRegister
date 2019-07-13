import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSlicedReceipts,
  getReceiptsByDate
} from "../../redux/actions/receiptActions";
import { formatDate } from "../utils";
import "../../styles/receipts.css";

import ReceiptsList from "./ReceiptsList";

const receiptsPerPage = 2;
const undefinedDateInput = "NaN-NaN-NaN NaN:NaN:NaN";
class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInputValue: undefinedDateInput
    };
  }

  componentDidMount() {
    this.props.getSlicedReceipts(receiptsPerPage, 0);
  }

  handleDateInputChange = event => {
    const date = formatDate(new Date(event.target.value));

    if (event.target.value === "")
      this.props.getSlicedReceipts(receiptsPerPage, 0);
    else this.props.getReceiptsByDate(receiptsPerPage, 0, date);

    this.setState({ dateInputValue: date });
  };

  handlePageDecrement = () => {
    if (this.props.page === 1) return;

    if (this.state.dateInputValue === undefinedDateInput)
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage - receiptsPerPage * 2
      );
    else
      this.props.getReceiptsByDate(
        receiptsPerPage,
        this.props.page * receiptsPerPage - receiptsPerPage * 2,
        this.state.dateInputValue
      );
  };

  handlePageIncrement = () => {
    if (this.props.page === this.props.totalPages) return;

    if (this.state.dateInputValue === undefinedDateInput)
      this.props.getSlicedReceipts(
        receiptsPerPage,
        this.props.page * receiptsPerPage
      );
    else
      this.props.getReceiptsByDate(
        receiptsPerPage,
        this.props.page * receiptsPerPage,
        this.state.dateInputValue
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
