const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema({
    
})

const newDb = mongoose.connection.useDb("EcommerceDb") 
module.exports = newDb.model('Review',reviewSchema)