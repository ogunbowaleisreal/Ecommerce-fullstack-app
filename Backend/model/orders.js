const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },

    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],

    price: Number,
    status:{
        type: String,
        enum : ["Ordered","Pending","Delivered","Shipped","Confirmed"]
    }}, 
    {
        timestamps : true
    }
)

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Order',orderSchema)