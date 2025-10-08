const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const USERS = require('../../model/User');

const authUser = async(req,res)=>{
    try{
    const {username, password }= req.body
    
    const registeredUser =await USERS.findOne({username : username})
    
        if (registeredUser){
            const match =  await bcrypt.compare(password, registeredUser.password)
        const roles = registeredUser.roles
        console.log(registeredUser._id)
        const user_id = registeredUser._id
        if(match){
            const access_token = jwt.sign(
                {userInfo:
                {"username": registeredUser.username, "roles" : roles ,"user_id":user_id} 
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5m'}
            );
            const refresh_token = jwt.sign(
                {userInfo:
                    {"username": registeredUser.username,"roles":roles,"user_id":user_id}}, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            registeredUser.refresh_token = refresh_token
            const result = await registeredUser.save();
             res.cookie('jwt_refresh', refresh_token, {httpOnly:true,sameSite:'Lax',secure:false,maxAge: 24 * 60 * 60 * 1000})
            return res.status(200).json({"message":"cookies are set","status":200,access_token,user_id,username})
        }
        return res.status(404).json({"message":"username & password do not match","status":404})
    }
    return res.status(404).json({"message":"Account not found , register instead ?"})
}catch(err){
    console.log(err)
    return res.status(401).send("not allowed , wrong credentials sent")
}
}


module.exports = authUser