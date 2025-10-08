const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    products:[{
        product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        },
        quantity:{
            type: Number,
            required:true
        },
        price:{
            type:Number,
            required: true
        }
    }],
    address:{
        type: String,
        required:true
    },
    totalAmount: Number,
    status:{
        type: String,
        enum : ["Ordered","Delivered","Shipped",],
        default: "Ordered"
    },
payment_status:{
    type:String,
    enum:["pending","failed","successful"],
    default: "pending"
    }}, 
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Order',orderSchema)