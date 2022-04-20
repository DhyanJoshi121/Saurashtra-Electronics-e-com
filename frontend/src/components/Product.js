import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    // <div className="card">
    //   <div className="cardContent">
    //     <Link to={`/product/${product._id}`}>
    //       <img src={product.image} alt="" className="cardImage" />
    //     </Link>

    //     <Link to={`/product/${product._id}`}>
    //       <div className="cardTitle">
    //         <strong>{product.name}</strong>
    //       </div>
    //     </Link>

    //     <Rating value={product.rating} text={product.numReviews} reviews />

    //     <h3 className="cardPrice">₹{product.price}</h3>
    //   </div>
    // </div>
    <Card className="my-3 p-3 rounded card-control">
      <Link to={`/product/${product._id}`}>
        <div className="card-imgContainer">
          <Card.Img src={product.image} variant="top" />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} reviews />
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">₹{product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
