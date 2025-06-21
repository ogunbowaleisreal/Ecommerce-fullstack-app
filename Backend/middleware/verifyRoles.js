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
        for(item of rolesAvailable){
            if (item !== true){
                return res.send(`${req.user} is not allowed for this route`)
            }
        }
        next()
    }
}

module.exports = verify_Roles