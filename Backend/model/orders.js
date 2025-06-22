const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new schema({

})

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Order',orderSchema)