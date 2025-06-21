require('dotenv').config()
const jwt = require('jsonwebtoken') 
const USER = require('../model/User')

const refreshTokenController= async(req,res)=>{
    try{
    const cookies = req.cookies
    const token = cookies.jwt_refresh
    const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET)
            const username = decoded.username
            const roles = decoded.roles
            const access_token = jwt.sign({
                userInfo : {"username": username,
                  "roles": roles  
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '60s'}
            )
            console.log('refresh route was successful')
        return access_token
        }catch(err){
        console.log(err)
        return false
    }
}


module.exports = refreshTokenController