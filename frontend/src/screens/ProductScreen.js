import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useRoutes } from "react-router-dom";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productAction";

const ProductScreen = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  //    const product = products.find((p) => p._id === id)
  // const [product, setProduct] = useState({});

  const [qty, setQty] = useState(1);

  //After redux
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  // console.log(productDetails);
  const { loading, error, product } = productDetails;
  // const product = {};

  useEffect(() => {
    // const featchProduct = async () => {
    //   const product = await fetch(`/api/products/${id}`);
    //   const data = await product.json();
    //   console.log(data);
    //   setProduct(data);
    // };
    // featchProduct();

    //After redux
    dispatch(listProductDetails(id));
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="ProductScreenHero">
      <button className="goBack" onClick={() => navigate("/")}>
        Go back
      </button>
      <div className="productGrid">
        <div className="col1">
          <img src={product.image} alt="" />
        </div>
        <div className="productDescriptionGrid">
          <ul className="col2">
            <li>
              <h3 className="productPageTitle">{product.name}</h3>
            </li>
            <li className="ratingLi">
              <Rating value={product.rating} text={product.numReviews} />
            </li>
            <li className="priceLi">Price: ${product.price}</li>
            <li className="descriptionLi">
              Description: {product.description}{" "}
            </li>
          </ul>
          <div className="col3">
            <ul className="addToCartBox">
              <li className="priceCartBox">
                Price: <span>${product.price}</span>
              </li>
              <li className="stockCartBox">
                Status:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </span>
              </li>
              {product.countInStock > 0 && (
                <li className="col3Qty">
                  <span>Qty</span>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </li>
              )}
              <li className="btnCartBox">
                <button
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
