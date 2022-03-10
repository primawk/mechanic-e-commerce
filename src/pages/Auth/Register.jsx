import React from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constants/API";
import Axios from "axios";
import { register } from "../../redux/actions/user";
import { connect } from "react-redux";
import "../../assets/styles/register.css";

import { NavItem, NavLink, Alert } from "react-bootstrap";

class Register extends React.Component {
  state = {
    user: {
      fullName: "",
      username: "",
      email: "",
      pasword: "",
    },
    submitted: false,
    emailProtection: "",
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  fetchEmail = (email) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        email,
      },
    }).then((result) => {
      console.log(result.data);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;

    if (user.fullName && user.username && user.email && user.password) {
      this.props.register(user);
      // {
      //   this.fetchEmail();
      // }
      // } else {

      //   // this.setState({ emailProtection: "Please in input a valid email" });
      //   // alert("account failed");
      // }
    }
  };

  render() {
    const { registering } = this.props;
    const { user, submitted, emailProtection } = this.state;
    if (this.props.userGlobal.role == "user") {
      return <Navigate to="/" />;
    } //after login go to home page
    else if (this.props.userGlobal.role == "admin") {
      return <Navigate to="/admin" />; // admin login
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Register</h1>
            <p className="lead">Browse and shop to find your tune!</p>
          </div>
        </div>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="row mt-5">
            <div className="col-4 offset-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bold mb-3">Register</h5>
                  {this.props.userGlobal.errMsg ? (
                    <div className="alert alert-danger">
                      {this.props.userGlobal.errMsg}
                    </div>
                  ) : null}

                  <input
                    name="fullName"
                    onChange={this.inputHandler}
                    placeholder="Full Name"
                    type="text"
                    className="form-control my-2"
                  />
                  {submitted && !user.fullName && (
                    <div className="help-block">Full Name is required</div>
                  )}
                  <input
                    name="username"
                    onChange={this.inputHandler}
                    placeholder="Username"
                    type="text"
                    className="form-control my-2"
                  />
                  {submitted && !user.username && (
                    <div className="help-block">Username is required</div>
                  )}
                  <input
                    name="email"
                    onChange={this.inputHandler}
                    placeholder="Email"
                    type="text"
                    className="form-control my-2"
                  />
                  {submitted && !user.email && (
                    <div className="help-block">
                      Please enter a valid email address
                    </div>
                  )}
                  <input
                    name="password"
                    onChange={this.inputHandler}
                    placeholder="Password"
                    type="password"
                    className="form-control my-2"
                  />
                  {submitted && !user.password && (
                    <div className="help-block">Password is required</div>
                  )}

                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button
                      // onClick={() => this.props.registerUser(this.state)}
                      className="btn btn-primary mt-2"
                    >
                      Register
                    </button>

                    <Link to="/login">Or login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
