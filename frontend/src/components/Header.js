import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const dropDownHandler = () => {
    document.querySelector(".dropdownUl").classList.toggle("toggleDropdown");
  };

  return (
    <header>
      <nav>
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
      </nav>
    </header>
  );
};

export default Header;
