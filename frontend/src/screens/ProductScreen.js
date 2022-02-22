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
            <img src={product.image} alt="" />
        </div>
    </div>
  )
}

export default ProductScreen
