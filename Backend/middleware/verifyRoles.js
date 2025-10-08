const verify_Roles = (...allowedRoles)=>{
    return (req,res,next)=>{

        try{
            
        const rolesArray = [...allowedRoles]
        const rolesAvailable = []
        for (items of rolesArray){
            if(!req.roles.includes(items)){
                rolesAvailable.push(false)
            }else{
                rolesAvailable.push(true)
            }
            
        }

        const rolesCheck =rolesAvailable.find(item=>item===true)
        if(rolesCheck){
        next()
        }else{
            return res.status(403).json({"message":`${req.user} is not allowed for this route`})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }
}
}

module.exports = verify_Roles