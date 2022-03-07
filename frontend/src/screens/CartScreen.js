import React, { useEffect } from "react";
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";

const CartScreen = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { id } = useParams();
  const qty = searchParams.has("qty") ? Number(searchParams.get("qty")) : 1;
  console.log(qty);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    // navigate("/login?redirect=shipping");
    userInfo ? navigate("/shipping") : navigate("/login?redirect=shipping");
  };
  return (
    <div className="cartPage">
      <h1>Cart</h1>
      <div className="container">
        <div className="cartCol1">
          {cartItems.map((item) => (
            <ul key={item.product}>
              <li className="productImage">
                <img src={item.image} alt="" />
              </li>
              <li className="productName">
                <Link
                  to={`/product/${item.product}`}
                  className="productNameLink"
                >
                  {item.name}
                </Link>
              </li>
              <li className="productPrice"> ₹{item.price} </li>
              <li className="qty">
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </li>
              <li className="remove">
                <button onClick={() => removeFromCartHandler(item.product)}>
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            </ul>
          ))}
        </div>
        <div className="cartCol2">
          <ul>
            <li className="subTotal">
              Subtotal of ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </li>
            <li className="totalPrice">
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </li>
            <li className="btnCheckout">
              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
