import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { addToCartHandler } from "../pages/ProductDetail";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";

class ProductCard extends React.Component {
  idrFormatter = () => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(this.props.productData.price);
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
            alert("Sucessfully added to cart!");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Failed to add");
          });
      } else {
        // barang belum ada
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.userGlobal.id,
          productId: this.state.productData.id,
          price: this.state.productData.price,
          productName: this.state.productData.album,
          productImage: this.state.productData.photo,
          quantity: this.state.quantity,
        })
          .then(() => {
            alert("Sucessfully added to cart!");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Failed to add");
          });
      }
    });
  };

  render() {
    return (
      <div className="card product-card">
        <img src={this.props.productData.photo} alt="" />
        <div className="mt-2">
          <div>
            <Link
              to={`/product-detail/${this.props.productData.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6>{this.props.productData.album}</h6>
            </Link>

            <h6 className="text-muted">{this.props.productData.artist}</h6>
            <span className="text-muted">{this.idrFormatter()}</span>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button
              onClick={this.addToCartHandler}
              className="btn btn-primary mt-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
