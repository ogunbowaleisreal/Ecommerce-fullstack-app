const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyAccess= async(req,res,next)=>{

    try{
const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({'message': "no token provided"})
    }
    const access_token = authHeader.split(' ')[1];
    if(!access_token){
        return res.status(401).json({"message":"nope allowed"})  
    }
    const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET,
    )
    req.user = decoded.userInfo.username
    req.roles = decoded.userInfo.roles
    req.user_id = decoded.userInfo.user_id
   return next()
  
    }catch(err){
        console.log(err)
          if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ "message": 'Token expired' });
  }
        return res.status(401).json({"message":"invalid token "})
    }

}

module.exports= verifyAccess