const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema({
    review:{
        type: Number,
        min:1,
        max:5,
        required : true
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"       
    },
    comment:{
        type: String,
        required:true
    }
},
{
    timestamps:true
}

)

module.exports = mongoose.model('Review',reviewSchema)