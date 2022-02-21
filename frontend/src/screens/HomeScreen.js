import React from 'react'
import products from "../products"
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
     <h1>Latest products </h1> 
    <div className="gridForCard" >
    {products.map(product => (
         <div key={product._id}><Product product = {product}/></div>
     ))}
    </div>
    </>
  )
}

export default HomeScreen
