import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };
  const dispatch = useDispatch();
  let navigate = useNavigate();

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.taxPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [navigate, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="checkoutWrapper">
        <div className="checkoutLeft">
          <div className="checkoutShippingAddress">
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}
              {cart.shippingAddress.postalCode}
              {cart.shippingAddress.country}
            </p>
          </div>
          <div className="checkoutPaymentMethod">
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="checkoutOrderItems">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <h2>Your cart is empty</h2>
            ) : (
              <div className="mapCheckoutProducts">
                {cart.cartItems.map((item, index) => (
                  <ul className="listGroup" key={index}>
                    <li>
                      <img src={item.image} alt={item.name} />
                    </li>
                    <li>
                      <Link
                        className="normalLink"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                    <li>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="checkoutRight">
          <div className="checkoutCard">
            <ul>
              <li style={{ border: "none" }}>
                <h2>Order Items</h2>
              </li>
              <li className="checkoutCardli">
                Items: <span>${cart.itemsPrice}</span>
              </li>
              <li className="checkoutCardli">
                Shipping: <span>${cart.shippingPrice}</span>
              </li>
              <li className="checkoutCardli">
                Tax: <span>${cart.taxPrice}</span>
              </li>
              <li className="checkoutCardli">
                Total: <span>${cart.totalPrice}</span>
              </li>
              <li className="checkoutCardli">{error && { error }}</li>
              <li className="checkoutCardBtnContainer">
                <button
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
