require('dotenv').config()
const jwt = require('jsonwebtoken') 
const USER = require('../../model/User')

const refreshTokenController= async(req,res)=>{
    try{
        console.log('refresh route was hit')
    const cookies = req.cookies
    const token = cookies.jwt_refresh
    console.log(token)
        const dbToken = await USER.findOne({refresh_token : token})
    if(dbToken && dbToken.refresh_token == token){
        console.log(`got here and here is the sent token ${token} and db token ${dbToken.refresh_token}`)
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
                {expiresIn: '5m'}
            )
            console.log('refresh route was successful')
        return res.status(200).json({"message":"access refreshed", access_token})
    }else{
    }
        }catch(err){
            if(err.name == 'TokenExpiredError'){
                return {"message":`${err.name} refresh token is also expired, need to login again`}
            }
            console.log(err)
            return {message:`${err.name}`}
    }
}

module.exports = refreshTokenController