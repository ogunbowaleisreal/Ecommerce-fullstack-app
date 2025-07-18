const mongoose= require('mongoose')
const schema = mongoose.Schema
const PRODUCTS = require('./products')

const cartSchema = new schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    Products:[{
        product_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity:{
        type: Number,
        required: true
    }
    }],
    total:{
        type:Number
    },
})

    cartSchema.pre('save',async function(next){
        let totalPrice = 0
        for(const items of this.Products){
            const product = await PRODUCTS.findOne({_id:items.product_id})
            if(product){
                totalPrice+= (product.Price * items.quantity)
            }
        }
        this.total = totalPrice
    next()})

module.exports = mongoose.model('Cart',cartSchema)