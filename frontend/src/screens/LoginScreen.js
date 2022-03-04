import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  console.log(email);

  useEffect(() => {
    if (userInfo) {
      //   history.pushState(redirect);
      navigate(redirect);
      console.log(userInfo);
      //need to change the route
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
    console.log("hi");
  };

  return (
    <div className="signinScreen">
      <h1>SIGN IN</h1>
      {error && <h2>{error}</h2>}
      {loading && "Loading..."}
      <form className="containerForm" onSubmit={submitHandler}>
        <label htmlFor="">Email Address</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SIGN IN</button>
        <h3>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginScreen;
