const express = require('express'); 
app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions')
const cors = require('cors');
const credentials= require('./middleware/credentials');
PORT = 3500;
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
// connecting to mongo db
 connectDB()
 app.use(credentials);
//middleware
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/refresh', require("./router/refresh"));

app.use('/verify', require("./router/verifyAuth"));

app.use('/logout', require("./router/logout"));

app.use('/transactions', require('./router/transactions'));

app.use('/register', require('./router/register'));

app.use('/login', require("./router/auth"));

mongoose.connection.once('open',()=>{ 
    console.log('mongoose successfully connected')
    app.listen(PORT,()=>{console.log(`server running on port${PORT}`)});
})


