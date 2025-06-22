require('dotenv').config()
const jwt = require('jsonwebtoken') 
const USER = require('../model/User')
const refreshEndpoint = require('./refreshToken')

const verifyAuthController= async(req,res)=>{
    try{
        console.log('verification route was hit')
    const cookies = req.cookies
    const access_token = cookies.jwt_access
    if(!access_token){
        return res.status(401).send("not allowed") 
    }
    jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET,        
    )
    return res.status(200).send('verified')
    }
    catch(err){
        const newAccess = await refreshEndpoint(req,res) 
        if(newAccess !== false){ 
            res.cookie('jwt_access', newAccess, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 24 * 60 * 60 * 1000})
                return res.status(200).send('verified')
        }else{
            console.log('error from refresh route')
            return res.status(401).send("u need to login again")
        }
    }
}

module.exports = verifyAuthController