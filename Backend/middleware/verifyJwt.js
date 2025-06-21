const jwt = require('jsonwebtoken')
require('dotenv').config()
const refreshRoute = require('../controller/refreshToken')

const verifyAccess= async(req,res,next)=>{
    try{
    const cookies= req.cookies
    const token = cookies.jwt_access
    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
    )
    req.user = decoded.userInfo.username
    req.roles = decoded.roles
    next()
    
    }catch(err){
        console.log(err)
        const newAccess = await refreshRoute(req,res)
        if(newAccess){
            res.cookie('jwt_access', newAccess, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 24 * 60 * 60 * 1000})
            const newPayload = jwt.verify(newAccess,process.env.ACCESS_TOKEN_SECRET)
            req.user = newPayload.userInfo.username
            req.roles = newPayload.roles
                next()

        }else{
            console.log('error from refresh route')
            return res.status(401).send('u have successfully logged out , plss login again ')
        }
    }

}

module.exports= verifyAccess