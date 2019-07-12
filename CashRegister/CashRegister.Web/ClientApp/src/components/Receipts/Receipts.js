import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSlicedReceipts } from "../../redux/actions/receiptActions";

import ReceiptsList from "./ReceiptsList";

const receiptsPerPage = 15;
class Receipts extends Component {
  componentDidMount() {
    this.props.getSlicedReceipts(receiptsPerPage, 0);
  }

  handlePageDecrement = () => {
    if (this.props.page === 1) return;

    this.props.getSlicedReceipts(
      receiptsPerPage,
      this.props.page * receiptsPerPage - receiptsPerPage * 2
    );
  };

  handlePageIncrement = () => {
    if (this.props.page === this.props.totalPages) return;

    this.props.getSlicedReceipts(
      receiptsPerPage,
      this.props.page * receiptsPerPage
    );
  };

  render() {
    return (
      <div>
        <input type="date" />

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
  getSlicedReceipts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipts);
