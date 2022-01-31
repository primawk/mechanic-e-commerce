import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Navigate } from "react-router-dom";

class Cart extends React.Component {
  state = {
    isCheckoutMode: false,
    recipientName: "",
    address: "",
    payment: 0,
    duitKurang: false,
    changes: false,
    paid: false,
  };

  idrFormatter = (val) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val);
  };

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then(() => {
        this.props.getCartData(this.props.userGlobal.id);
      })
      .catch(() => {
        alert("Error occurred");
      });
  };

  renderCart = () => {
    return this.props.cartGlobal.cartList.map((val) => {
      return (
        <tr>
          <td className="align-middle">{val.productName}</td>
          <td className="align-middle"> {this.idrFormatter(val.price)} </td>
          <td className="align-middle">
            <img src={val.productImage} alt="" style={{ height: "125px" }} />
          </td>
          <td className="align-middle">{val.quantity}</td>
          <td className="align-middle">
            {this.idrFormatter(val.quantity * parseInt(val.price))}
          </td>
          <td className="align-middle">
            <button
              onClick={() => this.deleteCartHandler(val.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderSubtotalPrice = () => {
    let subtotal = 0;
    for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
      subtotal +=
        parseInt(this.props.cartGlobal.cartList[i].price) *
        this.props.cartGlobal.cartList[i].quantity;
    }
    return subtotal;
  };

  renderTotalPrice = () => {
    return this.renderSubtotalPrice() + this.renderTaxFee();
  };

  renderTaxFee = () => {
    return this.renderSubtotalPrice() * 0.05;
  };

  checkoutModeToggle = () => {
    this.setState({ isCheckoutMode: !this.state.isCheckoutMode });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  renderMargin = () => {
    let margin = 0;
    return (margin = Math.abs(this.renderTotalPrice() - this.state.payment));
  };

  payBtnHandler = () => {
    // 1. Post to transaction
    // 2. Delete all cart that have been paid
    const margin = this.idrFormatter(
      Math.abs(this.renderTotalPrice() - this.state.payment)
    );
    if (this.state.payment < this.renderTotalPrice()) {
      this.setState({ duitKurang: true, payment: 0 });
      return;
    }
    if (this.state.payment > this.renderTotalPrice()) {
      this.setState({ changes: true, payment: 0 });
    } else if (this.state.payment === this.renderTotalPrice()) {
      this.setState({ paid: true, payment: 0 });
    }
    const d = new Date();
    Axios.post(`${API_URL}/transactions`, {
      userId: this.props.userGlobal.id,
      address: this.state.address,
      recipientName: this.state.recipientName,
      totalPrice: parseInt(this.renderTotalPrice()),
      totalPayment: parseInt(this.state.payment),
      transactionDate: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`, // DD-MM-YYYY
      transactionItems: this.props.cartGlobal.cartList, // Array of objects -> cart
    })
      .then((result) => {
        // alert("Thank you, your order is being processed!");
        this.setState({ paid: true });
        this.setState({ payment: 0 });
        result.data.transactionItems.forEach((val) => {
          this.deleteCartHandler(val.id);
        });
      })
      .catch(() => {
        alert("Error");
      });
  };

  render() {
    // Page Restriction
    if (this.props.userGlobal.id == 0) {
      alert("resctricted");
      return <Navigate to="/" />;
    }
    return (
      <div className="p-5 text-center">
        <h1>Cart</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="6">
                    <button
                      onClick={this.checkoutModeToggle}
                      className="btn btn-success"
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {this.state.isCheckoutMode ? (
            <div className="col-3">
              {/* Form Checkout */}
              <div className="card text-left">
                <div className="card-header">
                  <strong className="text-left">Order summary</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Subtotal Price</span>
                    <span>{this.idrFormatter(this.renderSubtotalPrice())}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Tax Fee (5%)</span>
                    <span>{this.idrFormatter(this.renderTaxFee())}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Total Price</span>
                    <span>{this.idrFormatter(this.renderTotalPrice())}</span>
                  </div>
                </div>
                <div className="card-body border-top">
                  <label htmlFor="recipientName">Recipient Name</label>
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    className="form-control mb-3"
                    name="recipientName"
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    className="form-control"
                    name="address"
                  />
                </div>
                <div className="card-footer">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <input
                      onChange={this.inputHandler}
                      name="payment"
                      className="form-control mx-1"
                      type="number"
                    />
                    <button
                      onClick={this.payBtnHandler}
                      className="btn btn-success mx-1"
                    >
                      Pay
                    </button>
                  </div>
                  <div className="mt-3">
                    <Alert
                      show={this.state.duitKurang}
                      variant="danger"
                      onClose={this.closeAlert}
                      dismissible={this.closeAlert}
                    >
                      You have insufficient funds of{" "}
                      {this.idrFormatter(this.renderMargin())}
                    </Alert>
                    <Alert
                      show={this.state.changes}
                      variant="success"
                      onClose={this.closeAlert}
                      dismissible={this.closeAlert}
                    >
                      Success! here are your changes{" "}
                      {this.idrFormatter(this.renderMargin())}
                    </Alert>
                    <Alert
                      show={this.state.paid}
                      variant="success"
                      onClose={this.closeAlert}
                      dismissible={this.closeAlert}
                    >
                      Thank you, your order is being processed!
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartGlobal: state.cart,
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
