import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { Button } from "react-bootstrap";

const OrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();
  console.log(id);

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get(`/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, successDeliver, order, navigate, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <>
      <h1 className="orderScreenOrderId">Order {id}</h1>
      <div className="checkoutWrapper">
        <div className="checkoutLeft">
          <div className="checkoutShippingAddress">
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email:</strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}
              {order.shippingAddress.postalCode}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <h2 className="success">Deliverd on {order.deliveredAt}</h2>
            ) : (
              <h2 className="danger">Not Delivered</h2>
            )}
          </div>
          <div className="checkoutPaymentMethod">
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <h2 className="success">Paid</h2>
            ) : (
              <h2 className="danger">Not Paid</h2>
            )}
          </div>

          <div className="checkoutOrderItems">
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <h2>Your order is empty</h2>
            ) : (
              <div className="mapCheckoutProducts">
                {order.orderItems.map((item, index) => (
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
                Items: <span>${order.itemsPrice}</span>
              </li>
              <li className="checkoutCardli">
                Shipping: <span>${order.shippingPrice}</span>
              </li>
              <li className="checkoutCardli">
                Tax: <span>${order.taxPrice}</span>
              </li>
              <li className="checkoutCardli">
                Total: <span>${order.totalPrice}</span>
              </li>
              {!order.isPaid && (
                <li>
                  {loadingPay && <h2>Loading...</h2>}
                  {!sdkReady ? (
                    <h2>Loading...</h2>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
              {loadingDeliver && <h2>Loading...</h2>}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <li>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
