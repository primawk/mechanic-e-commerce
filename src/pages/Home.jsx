import React from "react";
import "../assets/styles/home.css";
// import "../assets/images/listening.jpg";
import { connect } from "react-redux";
import { API_URL } from "../constants/API";
import Axios from "axios";
import ProductCard from "../components/ProductCard";
import { getCartData } from "../redux/actions/cart";

class Home extends React.Component {
  // componentDidMount = () => {
  //   this.props.getCartData();
  // };
  render() {
    return (
      <div class="blog">
     <div class="blog-post">
     <button type="button" class="btn btn-light btn-sm">Explore</button>

     </div>
      </div>
    );
  }
}
export default Home;
