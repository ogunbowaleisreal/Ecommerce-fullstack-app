const mongoose= require('mongoose')
const schema = mongoose.Schema

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
        ref: "products"
    },
    quantity:{
        type: Number,
        required: true
    }
    }]
})

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Cart',cartSchema)