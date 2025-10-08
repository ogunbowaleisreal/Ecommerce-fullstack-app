const PRODUCTS = require('../model/products');
const ORDERS = require('../model/orders');
const USERS = require('../model/User');
const REVIEW = require('../model/reviews');
const CART = require('../model/carts');
const body_parser = require('body-parser');

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const create_checkout_session = async(req,res)=>{
    try{
    const {user_id} = req.body
    if(!user_id){
        return res.status(403).json({"message":"cart content not found"})
    }

    const cart = await CART.findOne({user_id: user_id}).populate('Products.product_id')
    if(!cart){
        return res.status(404).json({"message":"cart not found"})
    }
    console.log(cart)
    const order = await ORDERS.create({
        "user_id": user_id,
        "products":cart.Products.map((item)=>(
            {"product_id": item.product_id._id,
             "quantity": item.quantity,
             "price": item.product_id.discounted_price ? item.product_id.discounted_price : item.product_id.Price  
            }
        )),
        "address": "27 omolade orepo street , ogunstate",
        "status": "Ordered",
        "payment_status": "pending"
    })
    if(order){
    const line_items = cart.Products.map((item)=>(
        {
            price_data:{
                currency:'usd',
                product_data:{"name": item.product_id.product_name},
                unit_amount:item.product_id.discounted_price ? Math.round(item.product_id.discounted_price * 100) : Math.round(item.product_id.Price * 100)
            },
            quantity: item.quantity
        }
    )) 
    const stripe_session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ['card'],
        line_items: line_items,
        success_url:'http://localhost:5173/checkout',
        cancel_url:'http://localhost:5173/cancel',
        metadata:{
            user_id:user_id
        }
    })
    return res.status(200).json({"message": "test sucessful","url":stripe_session.url})
}
    return res.status(403).json({"message": "product details not correct or some products doesnt exist anymore"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}}



const payment_webhook=async(req,res)=>{
    const signature = req.headers['stripe-signature']
    let event 
    try{
        event = await stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET_KEY
        )
        console.log(event.data)
    }catch(err){
        console.log(err)
    }
        switch(event.type){
            case 'checkout.session.completed':{
             console.log("payment successful")
             const session = event.data.object
             const user_id = session.metadata.user_id
             const order_update = await ORDERS.updateOne({user_id:user_id},{$set:{payment_status:"successful"}})
             if(order_update.modifiedCount > 0){
                console.log('order updated accordingly')
                return res.json({received: true})
             }else{
                console.warn('order not updated')
             }
            
            }
             case 'checkout.session.expired':{
                const failed_intent = event.data.object
                console.log('checkout expired')
                return res.json({received:true})
            }
            default:
                console.log(`unhandled event type ${event.type}`)
                return res.json({received: true})
        }
        
}

module.exports = {create_checkout_session, payment_webhook}