import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"; // to connect the pages
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Browse from "./pages/Browse";
import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";

import { connect } from "react-redux";
import { userKeepLogin } from "./redux/actions/user";
import { checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce"); // getting user data if anyone logged in
    if (userLocalStorage) {
      // if null (user hasn't log in) else
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage(); // to keep users who aren't log in access the website
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            {/* have to import the element , synchronus system first come first served */}
            <Route element={<Login />} path="/login" /> 
            <Route element={<Register />} path="/register" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Browse />} path="/browse" />
            <Route element={<ProductDetail />} path="/product-detail" />
            {/* <Route element={<RegisterPage />} path="/registerpage" /> */}
            <Route path="/" element={<Home />} />
            {/* "/" is in the last line due synchronus system */}
          </Routes>
        </BrowserRouter>
      );
    }

    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  // data
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  // function (usually export const userkeeplogin = ())
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
