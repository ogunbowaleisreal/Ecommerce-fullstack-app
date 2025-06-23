const mongoose= require('mongoose')
const schema = mongoose.Schema

const cartSchema = new schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    Products:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Cart',cartSchema)