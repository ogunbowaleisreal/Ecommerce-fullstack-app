require('dotenv').config()

const USER = require('../../model/User');
const logoutController= async(req,res)=>{
    try{
    const cookies = req.cookies
    const refresh_token = cookies.jwt_refresh
    if(!refresh_token){
        console.log("u already logged out")
            const dbToken = await USER.updateOne({refresh_token : refresh_token},{$set:{refresh_token:""}})
        return res.send('you are already logged out ')
    }else{
    const dbToken = await USER.updateOne({refresh_token : refresh_token},{$set:{refresh_token:""}})
    if(dbToken.modifiedCount == 1){
        res.clearCookie("jwt_refresh",{httpOnly: true, secure:false})
        res.clearCookie("jwt_access",{httpOnly: true, secure:false}) 
        return res.status(200).json({"message":"logged out"})
    }
}
}catch(err){
    console.log(err)
    return res.sendStatus(500).send('internal server error, u might not be logged out') 
    }
}

module.exports = logoutController