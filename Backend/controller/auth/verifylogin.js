require('dotenv').config()
const jwt = require('jsonwebtoken') 
const USER = require('../../model/User')
const refreshEndpoint = require('./refreshToken')

const verifyAuthController= async(req,res)=>{
    try{
        console.log('verification route was hit')
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({'message': "no token provided"})
    }
    const access_token = authHeader.split(' ')[1];
    console.log(access_token)
    if(!access_token){
        return res.status(401).json({"message":"nope allowed"})  
    }
    jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET,        
    )
    console.log('got here')
    return res.status(200).send('verified')
    }
    catch(err){
        console.log(err)
        return res.status(401).json({"message": " malformed, expired or invalid token"})
    }
}

module.exports = verifyAuthController