require('dotenv').config()

const USER = require('../model/User');
const logoutController= async(req,res)=>{
    try{
    const cookies = req.cookies
    const refresh_token = cookies.jwt_refresh
    const access_token = cookies.jwt_access
    res.clearCookie("jwt_refresh",{httpOnly: true, secure:false})
    res.clearCookie("jwt_access",{httpOnly: true, secure:false})
    res.sendStatus(200)
}catch(err){
    console.log(err.message)
    res.clearCookie("jwt_refresh",{httpOnly: true, secure:false})
    res.clearCookie("jwt_access",{httpOnly: true, secure:false})
    res.sendStatus(200) 
    }
}

module.exports = logoutController