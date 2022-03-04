import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="shippingScreenWrapper">
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>
      <form className="containerForm reduceRemOnForm" onSubmit={submitHandler}>
        <label htmlFor="">Address</label>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="">City</label>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />

        <label htmlFor="">Postal Code</label>
        <input
          type="text"
          placeholder="Enter postalCode"
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <label htmlFor="">Country</label>
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
