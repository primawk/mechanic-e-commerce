import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCartData } from "../redux/actions/cart";
import { Alert, Modal, Button } from "react-bootstrap";

class ProductDetail extends React.Component {
  state = {
    productData: {}, // specific product
    productNotFound: false,
    quantity: 1,
    addToCart: false,
    addToCartCls: true,
  };

  idrFormatter = (val) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val);
  };

  fetchProductData = () => {
    // alert(window.location.search.substring(1));
    Axios.get(`${API_URL}/products`, {
      params: {
        id: window.location.search.substring(1),
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ productNotFound: true });
        }
      })
      .catch(() => {
        alert("error");
      });
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  addToCartHandler = () => {
    // Check apakah user sudah memiliki barang tsb di cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.state.productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        // Barang sdh ada
        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + this.state.quantity,
        })
          .then(() => {
            this.props.getCartData(this.props.userGlobal.id);
            this.setState({ addToCartCls: false, addToCart: false });
          })
          .catch(() => {
            alert("Failed to add");
          });
      } else {
        // barang belum ada
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.userGlobal.id, // unique user
          productId: this.state.productData.id,
          price: this.state.productData.price,
          productName: this.state.productData.album,
          productImage: this.state.productData.photo,
          quantity: this.state.quantity,
        })
          .then(() => {
            this.setState({ addToCart: true });
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Failed to add");
          });
      }
    });
  };

  closeAlert = () => {
    {
      this.setState({ addToCartCls: false, addToCart: false });
    }
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    //Restriction page
    if (this.props.userGlobal.id == 0) {
      return <Navigate to="/login" />; // redirect into a page
    }

    return (
      <div className="container">
        {this.state.productNotFound ? (
          <div className="alert alert-warning mt-3">
            Product with ID {window.location.pathname.slice(-2)} has not been
            found
          </div>
        ) : (
          <div className="row mt-3">
            <Alert
              show={this.state.addToCart}
              variant="success"
              onClose={this.closeAlert}
              dismissible={this.closeAlert}
            >
              Added to cart.
            </Alert>
            <div className="col-6">
              <img
                style={{ width: "100%" }}
                src={this.state.productData.photo}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <p>
                <h4>{this.state.productData.album}</h4>
              </p>
              <p>
                <h5>{this.idrFormatter(this.state.productData.price)}</h5>
              </p>
              <p>{this.state.productData.artist}</p>
              <p>Label : {this.state.productData.label}</p>
              <p>Country : {this.state.productData.country}</p>
              <p>Genre : {this.state.productData.genre}</p>
              <p>Released : {this.state.productData.released}</p>

              <div className="d-flex flex-row align-items-center">
                <button
                  onClick={() => this.qtyBtnHandler("decrement")}
                  className="btn btn-primary mr-4"
                >
                  -
                </button>
                {this.state.quantity}
                <button
                  onClick={() => this.qtyBtnHandler("increment")}
                  className="btn btn-primary mx-4"
                >
                  +
                </button>
                <input
                  placeholder="1"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max=""
                ></input>
              </div>
              <button
                onClick={this.addToCartHandler}
                className="btn btn-success mt-3"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
