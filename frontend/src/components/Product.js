import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <div className='card'>
        <div className="cardContent">
        <Link to={`/product/${product._id}`}>
      <img src={product.image} alt="" className='cardImage'/>
      </Link>

      <Link to={`/product/${product._id}`}>
      <div className="cardTitle"><strong>{product.name}</strong></div>
      </Link>

      <Rating value = {product.rating} text = {product.numReviews} reviews/>

      <h3 className="cardPrice">${product.price}</h3>
        </div>

    </div>
  )
}

export default Product
