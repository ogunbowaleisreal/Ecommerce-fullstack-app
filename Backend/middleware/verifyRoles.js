const verify_Roles = (...allowedRoles)=>{
    return (req,res,next)=>{
        const rolesArray = [...allowedRoles]
        const rolesAvailable = []
        console.log(req.roles)
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
            return res.send(`${req.user} is not allowed for this route`)
        }
    }
}

module.exports = verify_Roles