const mongoose = require('mongoose');
const schema = mongoose.Schema

const usersSchema = new schema({
    username : {
        type: String,
        required: true
    },
    password :{
        type : String,
        required: true 
    },
    roles:{
        user:{
        type: Number,
        default: 2001,
        },
    editor: Number,
    Admin: Number
    },
    refresh_token : String,
    balance : {
        type:mongoose.Schema.Types.Decimal128,
        default:0
     }
});

const newDb = mongoose.connection.useDb("EcommerceDb") 

module.exports = newDb.model('User', usersSchema)