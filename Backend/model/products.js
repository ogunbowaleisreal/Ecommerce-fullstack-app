const mongoose = require('mongoose')
const schema = mongoose.Schema

const transactionSchema = new schema({
    username:{
        type: String,
        required : true
    },
    date:{
        type: Date,
    timestamps : true
    },
    type:{ 
        type:"String",
        enum : ["income","expense"],
        required:true
    },
    category:{
        type: String,
        enum :["Transportation","Food","Salary","Leisure","Others","Subscriptions"],
        required : true
    },
    amount:{
        type : Number,
        required : true
    },
    description :{
        type : String
    },
},{
    timestamps: true
}
)
const newDb = mongoose.connection.useDb("ExpenseTrackerDB") 
module.exports = newDb.model('Transaction',transactionSchema)