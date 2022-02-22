import React from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'


const ProductScreen = () => {
    let {id} = useParams();
    let navigate = useNavigate();
   const product = products.find((p) => p._id === id)


  return (
    <div className='ProductScreenHero'>
        <button className='goBack' onClick={()=> navigate('/')}>Go back</button>
        <div className="productGrid">
            <div className="col1">
            <img src={product.image} alt="" />
            </div>
            <div className='productDescriptionGrid'>
                <ul className='col2'>
                    <li><h3 className='productPageTitle'>{product.name}</h3></li>
                    <li className='ratingLi'><Rating value={product.rating} text={product.numReviews}/></li>
                    <li className='priceLi'>Price: ${product.price}</li>
                    <li className='descriptionLi'>Description: {product.description} </li>
                </ul>
                <div className="col3">
                <ul className='addToCartBox'>
                    <li className='priceCartBox'>Price: <span>${product.price}</span></li>
                    <li className='stockCartBox'>Status: <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span></li>
                    <li className='btnCartBox'><button disabled={product.countInStock === 0}  >Add To Cart</button></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductScreen
