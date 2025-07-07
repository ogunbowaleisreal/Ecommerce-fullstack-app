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
        ref: "Product"
    },
    quantity:{
        type: Number,
        required: true
    }
    }]
})

module.exports = mongoose.model('Cart',cartSchema)