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
        type:[Number],
        enum:[2001,2002,2003,2004],
        default:[2001]
    },
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
     },
     refresh_token: String
});

const newDb = mongoose.connection.useDb("EcommerceDb") 

module.exports = newDb.model('User', usersSchema)