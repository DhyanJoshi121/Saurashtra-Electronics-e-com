const express = require('express')
const app = express()
const products = require('./Data/products')



app.listen(5000,console.log('running on 5000'))


app.get('/',(req,res) => {
    res.send('hello')
})

app.get('/api/products',(req,res) => {
    res.json(products)
})

app.get('/api/product/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})