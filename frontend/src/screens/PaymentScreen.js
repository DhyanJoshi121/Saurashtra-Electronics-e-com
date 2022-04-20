import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  if (!shippingAddress) navigate("/shipping");

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="shippingScreenWrapper">
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <form className="containerForm reduceRemOnForm" onSubmit={submitHandler}>
        <label htmlFor="">Paypal or Credit Card</label>
        <input
          type="radio"
          name="paymentMethod"
          id="PayPal"
          value="Paypal"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        {/* <label htmlFor="">PhonePe</label>
        <input
          type="radio"
          name="paymentMethod"
          id="PhonePe"
          value="PhonePe"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> */}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
