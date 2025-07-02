const jwt = require('jsonwebtoken')
require('dotenv').config()
const refreshRoute = require('../controller/refreshToken')

const verifyAccess= async(req,res,next)=>{

    try{
    const cookies= req.cookies
    const token = cookies.jwt_access
    console.log(token)
    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
    )
        console.log(decoded)
    req.user = decoded.userInfo.username
    req.roles = decoded.userInfo.roles
    req.user_id = decoded.userInfo.user_id
    next()
  
    }catch(err){
        console.log(err)
        const newAccess = await refreshRoute(req,res)
        if(newAccess){
            console.log(newAccess)
            res.cookie('jwt_access', newAccess, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 24 * 60 * 60 * 1000})
            const newPayload = jwt.verify(newAccess,process.env.ACCESS_TOKEN_SECRET)
            req.user = newPayload.userInfo.username
            req.roles = newPayload.userInfo.roles
            req.user_id = newPayload.userInfo.user_id
                next()

        }else{
            console.log('error from refresh route')
            return res.status(401).send('u have successfully logged out , plss login again ')
        }
    }

}

module.exports= verifyAccess