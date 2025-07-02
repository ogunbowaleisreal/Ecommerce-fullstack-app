const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PRODUCTS = require('./model/products');
const ORDERS = require('./model/orders');
const REVIEWS = require('./model/reviews');
const CART = require('./model/carts');

async function script (){
    const connectDB = require('./config/dbConn')
     connectDB()
    mongoose.connection.once('open',()=>{ 
        console.log('mongoose successfully connected')})
    const products = await PRODUCTS.find()
    for(const item of products){
        item.image_url = "https://picsum.photos/200/300"
    await item.save()

    }
    console.log(products)
}
script()