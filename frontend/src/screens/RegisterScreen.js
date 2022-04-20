import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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
    //dispatch Register
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="signinScreen">
      <h1>SIGN UP</h1>
      {message && <h2>{message}</h2>}
      {error && <h2>{error}</h2>}
      {loading && "Loading..."}
      <form className="containerForm" onSubmit={submitHandler}>
        <label htmlFor="">Name</label>
        <input
          type="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Enter ConfirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <h3>
          Have an Account?{""}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default RegisterScreen;
