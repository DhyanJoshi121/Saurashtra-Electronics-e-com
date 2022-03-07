import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const dropDownHandler = () => {
  //   document.querySelector(".dropdownUl").classList.toggle("toggleDropdown");
  // };

  return (
    <header>
      {/* <nav>
        <Link to="/">
          <h1>Main</h1>
        </Link>
        <ul>
          <li>
            <Link to="/cart" className="liLink">
              <i className="fas fa-shopping-cart"></i>Cart
            </Link>
          </li>
          {userInfo ? (
            <div className="userDropdown ">
              <span
                className="userName liLink"
                onClick={() => dropDownHandler()}
              >
                {userInfo.name}
                <i className="fa-solid fa-caret-down"></i>
              </span>
              <ul className="dropdownUl toggleDropdown">
                <li className="profileWord">
                  <Link to="/profile" className="userProfile">
                    Profile
                  </Link>
                </li>
                <li>
                  <span onClick={logoutHandler}>Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            <li>
              <Link to="/login" className="liLink">
                <i className="fas fa-user"></i>Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav> */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" style={{ fontSize: "1.7rem" }}>
            <NavbarBrand>Saurashtra Electronics</NavbarBrand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Toggle id="basic-navbar-nav" />
          <Navbar.Collapse className="ml-auto navFont">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* {userInfo && userInfo.isAdmin && (
        <NavDropdown title="Admin" id="adminmenu">
          <LinkContainer to="/admin/userlist">
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/productlist">
            <NavDropdown.Item>Product</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/orderlist">
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )} */}
    </header>
  );
};

export default Header;
