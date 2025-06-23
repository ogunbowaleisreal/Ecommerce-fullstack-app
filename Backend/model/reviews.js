const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema({
    review:{
        type: Number,
        min:1,
        max:5,
        required : true
    },
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"       
    },
},
{
    timestamps:true
}

)

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Review',reviewSchema)