const Transactions = require('../model/Transactions');
const TRANSACTIONS = require('../model/Transactions');
const USERS = require('../model/User')

const getallTransactions = async(req,res)=>{
    const curr_date = new Date()
    const year = curr_date.getFullYear()
    const month = curr_date.getMonth()
    const startofMonth = new Date(year,month,1)
    const startofnextMonth = new Date(year,month + 1,1)
    const allTransactions = await TRANSACTIONS.find({username:req.user}) 
    const totals= await Transactions.aggregate([
        {$match:{username: req.user}},
        {$facet:
        {allIncome:[{$match:{type:"income"}}],
        allExpense:[{$match:{type:"expense"}}],
        total:[{$group:{_id:"$type",total:{$sum :"$amount"}}}],
        incomeCategory:[{$match:{createdAt:{$gte:startofMonth, $lt:startofnextMonth},type: "income"}},{$group:{_id:{$dayOfMonth:"$createdAt"},total:{$sum:"$amount"}}}],
        expenseCategory:[{$match:{createdAt:{$gte:startofMonth, $lt:startofnextMonth},type: "expense"}},{$group:{_id:"$category",total:{$sum:"$amount"}}}],
        allincomeCategory:[{$match:{type: "income"}},{$group:{_id:{$dayOfMonth:"$createdAt"},total:{$sum:"$amount"}}}],
        allexpenseCategory:[{$match:{type: "expense"}},{$group:{_id:{$dayOfMonth:"$createdAt"},total:{$sum:"$amount"}}}]
    }}])
     let totalIncome = 0;
    let totalExpense = 0;
    for (const entry of totals[0].total){
      if (entry._id === "income") totalIncome = entry.total;
      if (entry._id === "expense") totalExpense = entry.total;
    }
    if(allTransactions && totals){
       return res.json({
        "allTransactions":allTransactions,
        "allExpense":totals[0].allExpense,
        "allIncome":totals[0].allIncome,
        "incomeCategory": totals[0].incomeCategory,
        "expenseCategory": totals[0].expenseCategory,
        "allincomeCategory" :totals[0].allincomeCategory,
        "allexpenseCategory":totals[0].allexpenseCategory,
        "balance":totalIncome-totalExpense,
        "totalIncome": totalIncome,
        "totalExpense": totalExpense,
        
    })
    }
    return res.status(403).send("unauthorized")
}

const createTransactions = async(req,res)=>{

    try{ 
    const username =req.user
    const type = req.body.type
    const category = req.body.category
    const amount = req.body.amount
    
     const result =  await TRANSACTIONS.create({
        "username": username,
        "type": type,
        "category":category,
        "amount" : amount,
       })
       console.log(result)
       if(result){
            return res.status(200).send("transaction approved")
    }
}catch(err){
        console.log(err)
        res.status(400).send('wrong data sent , please try again with the correct credentials')
    } 
}

const gettodo =async (req,res)=>{
    const given_id = req.params.id
    const registeredUser =await TRANSACTIONS.findOne({_id : given_id})
    if(given_id){
            return res.json(registeredUser)  
        }
   return  res.send('requested item not available')
}
const deletetodo = async(req,res)=>{

    try{
        
    const req_id = req.body.id
    if(!req_id){

        return res.sendStatus(404)
    }
    const response = await TRANSACTIONS.deleteOne({_id :req_id})
    if(response.deletedCount == 1){
        return res.status(200).json({"message" : `item with id ${req_id} has been deleted`}) 
    }else{
        res.sendStatus(404)
    }
    }catch(err){
        console.log(err)
    }
}

const updateTodo = async(req,res)=>{
    try {
    const user_id = req.body.id
    const completeStatus = req.body.completed
    const todo = req.body.item
    const username = req.body.username
    if(todo){
        console.log(todo)
       const result =  await TRANSACTIONS.updateOne({_id : user_id},{$set : {item: todo}})
       if(result){
        console.log(result)
        return res.status(200).send("done")
       }
    }
    const result =  await TODO.updateOne({_id : user_id},{$set : {completed: completeStatus}})
    if(result){
        return res.status(200).send("done")
    }

    } catch (error) {
        console.log(error)
        res.status(401).send('error , unable to update todo')


    }
}
module.exports = {getallTransactions, createTransactions, gettodo, deletetodo,updateTodo}