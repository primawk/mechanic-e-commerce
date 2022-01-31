import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/API";
import Axios from "axios";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";
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
    emailProtection: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.fullName && user.username && user.email && user.password) {
      this.props.registerUser(user);
    }
  };

  render() {
    const { registering } = this.props;
    const { user, submitted, emailProtection } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.fullName ? " has-error" : "")
            }
          >
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={user.fullName}
              onChange={this.handleChange}
            />
            {submitted && !user.fullName && (
              <div className="help-block">Full Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !user.email ? " has-error" : "")
            }
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
            {submitted && !user.email && (
              <div className="help-block">
                Please enter a valid email address
              </div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.email ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
    // return (
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-12 text-center">
    //         <h1>Register</h1>
    //         <p className="lead">Browse and shop to find your tune!</p>
    //       </div>
    //     </div>
    //     <form name="form" onSubmit={this.handleSubmit}>
    //       <div className="row mt-5">
    //         <div className="col-4 offset-4">
    //           <div className="card">
    //             <div className="card-body">
    //               <h5 className="font-weight-bold mb-3">Register</h5>

    //               <input
    //                 name="fullName"
    //                 onChange={this.inputHandler}
    //                 placeholder="Full Name"
    //                 type="text"
    //                 className="form-control my-2"
    //               />
    //               <input
    //                 name="username"
    //                 onChange={this.inputHandler}
    //                 placeholder="Username"
    //                 type="text"
    //                 className="form-control my-2"
    //               />
    //               <input
    //                 name="email"
    //                 onChange={this.inputHandler}
    //                 placeholder="Email"
    //                 type="text"
    //                 className="form-control my-2"
    //               />
    //               <input
    //                 name="password"
    //                 onChange={this.inputHandler}
    //                 placeholder="Password"
    //                 type="password"
    //                 className="form-control my-2"
    //               />
    //               <div className="d-flex flex-row justify-content-between align-items-center">
    //                 <button
    //                   // onClick={() => this.props.registerUser(this.state)}
    //                   className="btn btn-primary mt-2"
    //                 >
    //                   Register
    //                 </button>

    //                 <Link to="/login">Or login</Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
