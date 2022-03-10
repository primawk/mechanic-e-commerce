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
          {/* if teary */}
          {this.props.userGlobal.id ? (
            // react fragment <> </> like <div>
            <>
              <Nav className="me-auto" navbar></Nav>

              <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>

              <NavbarText>
                <NavLink href="/cart">
                  {" "}
                  Cart ({this.props.cartGlobal.cartList.length})
                </NavLink>
              </NavbarText>

              {this.props.userGlobal.role == "admin" ? (
                <NavbarText>
                  <NavLink href="/admin"> Admin</NavLink>
                </NavbarText>
              ) : null}

              <Button size="md" onClick={this.props.logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <NavbarText>
              {/* <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
              <NavbarText></NavbarText> */}
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link> |{" "}
              {/* <Link to="/cart">Cart</Link> */}
              {/* <Button size="md" onClick={this.props.logoutUser}>
            Logout
          </Button> */}
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
