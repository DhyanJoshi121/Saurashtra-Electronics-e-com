import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkoutLinkWrapper">
      <ul>
        <li>
          {step1 ? (
            <Link to="/login" className="normalLink">
              Sign In
            </Link>
          ) : (
            <Link to="" disabled className="disabledLink">
              Sign In
            </Link>
          )}
        </li>

        <li>
          {step2 ? (
            <Link to="/shipping" className="normalLink">
              Shipping
            </Link>
          ) : (
            <Link to="" disabled className="disabledLink">
              Shipping
            </Link>
          )}
        </li>

        <li>
          {step3 ? (
            <Link to="/payment" className="normalLink">
              Payment
            </Link>
          ) : (
            <Link to="" disabled className="disabledLink">
              Payment
            </Link>
          )}
        </li>

        <li>
          {step4 ? (
            <Link to="/placeorder" className="normalLink">
              Place Order
            </Link>
          ) : (
            <Link to="" disabled className="disabledLink">
              Place Order
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
