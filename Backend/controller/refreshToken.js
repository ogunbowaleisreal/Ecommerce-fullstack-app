require('dotenv').config()
const jwt = require('jsonwebtoken') 
const USER = require('../model/User')

const refreshTokenController= async(req,res)=>{

    try{
    const cookies = req.cookies
    const token = cookies.jwt_refresh
    console.log(token)
        const dbToken = await USER.findOne({refresh_token : token})
    if(dbToken){
    const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET)
            const username = decoded.userInfo.username
            const roles = decoded.userInfo.roles
            const user_id =decoded.userInfo.user_id
            const access_token = jwt.sign({
                userInfo : 
                {"username": username,"roles": roles,"user_id": user_id }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            console.log('refresh route was successful')
        return access_token
    }
        }catch(err){
        console.log(err)
        return false
    }
}

module.exports = refreshTokenController