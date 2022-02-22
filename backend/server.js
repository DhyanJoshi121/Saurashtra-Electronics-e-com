import express from 'express'
const app = express()
import products from './Data/products.js'
import dotenv from 'dotenv'



const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`running on ${PORT}`))


app.get('/',(req,res) => {
    res.send(`hello mate running on ${PORT}`)
})

app.get('/api/products',(req,res) => {
    res.json(products)
})

app.get('/api/product/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})