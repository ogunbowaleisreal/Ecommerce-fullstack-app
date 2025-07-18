const mongoose = require('mongoose')
const schema = mongoose.Schema

const productsSchema = new schema({
    product_name:{
        type: String,
        required : true
    },
    Price:{
        type: Number,
        required:true
    },
    discounted_price:{
        type: Number,
    },
    category:{ 
        type:String,
        enum:["Men","Women","Kids","Electronics","Phones","Gaming","Footwear","Food"],
        required:true
    },
    quantity:{
        type: Number,
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

productsSchema.pre('save',function(next){
    if(this.discounted_price == null){
        this.discounted_price = this.Price
    }
    next()
})
module.exports = mongoose.model('Product',productsSchema)