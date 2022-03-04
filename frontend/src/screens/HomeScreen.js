import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productAction";

const HomeScreen = () => {
  // before redux
  // const [products, setProducts] = useState([]);

  // ------------------------------------------------------------
  //After redux

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // before redux
    // const featchProducts = async () => {
    //   const products = await fetch("/api/products");
    //   const data = await products.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // featchProducts();
    //-----------------------------------------------------------
    // after redux

    dispatch(listProducts());
  }, [dispatch]);

  // const products = [];

  return (
    <>
      <h1>Latest products </h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="gridForCard">
          {products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
