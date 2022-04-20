import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productAction";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  // before redux
  // const [products, setProducts] = useState([]);

  // ------------------------------------------------------------
  //After redux
  let { keyword, pageNumber = 1 } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products: prodcutsTop } = productTopRated;
  console.log(prodcutsTop);

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

    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // const products = [];

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest products </h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        // <div className="gridForCard">
        //   {products.map((product) => (
        //     <div key={product._id}>
        //       <Product product={product} />
        //     </div>
        //   ))}
        // </div>
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default HomeScreen;
