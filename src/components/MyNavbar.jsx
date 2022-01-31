import React from "react";
import {
  Navbar,
  Nav,
  Button,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
  NavbarText,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";
import { Navigate } from "react-router-dom";

class MyNavbar extends React.Component {
  //fx log out pake state kalo true akan pindah
  render() {
    console.log(this.props.cartGlobal);
    return (
      <div>
        <Navbar color="secondary" dark expand="md" full light>
          {/* home tab */}
          <NavbarBrand href="/">mechanical</NavbarBrand>
          {/* browse tab */}
          <NavbarText>
            <NavLink href="/browse">Browse</NavLink>
          </NavbarText>
          <Nav className="me-auto" navbar></Nav>

          {this.props.userGlobal.username ? (
            <>
              <Nav className="me-auto" navbar></Nav>

              <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
              <NavbarText>
                <Link to="/cart">
                  Cart ({this.props.cartGlobal.cartList.length})
                </Link>
              </NavbarText>

              <Button size="md" onClick={this.props.logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <NavbarText>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link> |{" "}
              <Link to="/cart">Cart</Link>
            </NavbarText>
          )}
        </Navbar>
      </div>
    );
  }
}

//this is the part to connect to our databasae
const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
