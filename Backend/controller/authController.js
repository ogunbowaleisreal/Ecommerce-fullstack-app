const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const USERS = require('../model/User');

const authUser = async(req,res)=>{
    try{
    const {username, password }= req.body
    
    const registeredUser =await USERS.findOne({username : username})
    
        if (registeredUser){
            const match =  await bcrypt.compare(password, registeredUser.password)
        const roles = Object.values(Object.values(registeredUser.roles))
        if(match){
            const access_token = jwt.sign(
                {userInfo:
                {"username": registeredUser.username, "roles" : roles }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30m'}
            );
            const refresh_token = jwt.sign(
                {"username": registeredUser.username}, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            registeredUser.refresh_token = refresh_token
            const result = await registeredUser.save();
             res.cookie('jwt_refresh', refresh_token, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 24 * 60 * 60 * 1000})
             res.cookie('jwt_access', access_token, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 5 * 60 * 1000})

            return res.status(200).send("cookies are set")
        }
    }
    return res.status(403)
}catch(err){
    console.log(err)
    return res.status(401).send("not allowed , wrong credentials sent")
}
}


module.exports = authUser