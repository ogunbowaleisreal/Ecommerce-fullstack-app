const bcrypt = require('bcrypt')
const USERS = require('../../model/User') 

const registerUser = async(req,res)=>{
    const {username , password , roles} = req.body
    const duplicate = await USERS.findOne({username: username })
    if (duplicate){
        res.status(403).send(`user: ${username} is already taken`)
        return  
    }
   try{
    const hashed_pwd = await bcrypt.hash(password,10);
   const new_user = {"username" : username, "password": hashed_pwd}
   const result = await USERS.create({"username" : username,
     "password": hashed_pwd,"roles": roles})
   return res.status(200).json(`user ${username} successfully created`)
   }catch(err){
    console.log(err)
    res.sendStatus(403)
   }
}

module.exports = registerUser