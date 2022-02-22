import React from 'react'
import { useState, useEffect } from 'react'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{

    const featchProducts = async () =>{
      const products = await fetch('/api/products')
      const data = await products.json()
      console.log(data)
      setProducts(data)
    }

    featchProducts()
  },[])
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
