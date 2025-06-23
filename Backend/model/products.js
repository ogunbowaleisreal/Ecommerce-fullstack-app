const mongoose = require('mongoose')
const schema = mongoose.Schema

const productsSchema = new schema({
    name:{
        type: String,
        required : true
    },
    Product_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    Price:{
        type: Number,
        required:true
    },
    category:{ 
        type:"String",
        required:true
    },
    quantity:{
        type: Number,
        required : true
    },
    amount:{
        type : Number,
        required : true
    },
    image_url:{
        type:String
    },
    description :{
        type : String
    },
},{
    timestamps: true
}
)
const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Product',productsSchema)