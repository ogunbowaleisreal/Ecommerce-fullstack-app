const PRODUCTS = require('../model/products');
const ORDERS = require('../model/orders');
const USERS = require('../model/User');
const REVIEW = require('../model/reviews');
const cloudinary = require('../config/cloudinary')

const createProduct=async (req,res)=>{
 
    try{
    const {product_name,category,Price,discounted_price,quantity,description} = req.body
    const result = await cloudinary.uploader.upload(req.file.path,
        {folder:'products_images'}
    )
    const newProduct = await PRODUCTS.create({
     product_name:product_name,
     category : category,
     Price :Price,
     discounted_price :discounted_price,
     quantity :quantity,
     description :description,
     image_url: result.secure_url
    })
    console.log(newProduct)
    if(newProduct){
        return res.status(200).json({"message":"New Product added successfully"})
    }
}catch(err){
    console.log(err.message)
    return res.status(500).send("internal server error")
}
}

const productDetails=async(req,res)=>{

    try{       
    const product_id = req.params.id
    const product =await PRODUCTS.findById(product_id)
    const reviews = await REVIEW.find({product_id:product_id}).sort({createdAt:-1})
    if(product){
        console.log(product)
    return res.json([product, reviews])
    }else{
        return res.status(404).json({"message":"product not found"})
    }
    }catch(err){
        console.log(err)
        res.status(500).json({"message":"internal error"})
    }
}

const deleteProduct=async(req,res)=>{
    
    const product_id = req.params.id
        try{
        const deletedproduct = await PRODUCTS.deleteOne({_id:product_id})
        if(deletedproduct.deletedCount == 1){
            return res.status(200).json({"message":"item successfully deleted"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }
}

const getallUsers=async(req,res)=>{
    try{
        const allusers = await USERS.find({}).sort({createdAt:-1})
        if(allusers){
            return res.status(200).json(allusers)
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }
}

const updateProduct=(req,res)=>{


}

const createUser=(req,res)=>{

}

const updateOrder=async(req,res)=>{
    try{
    const updatedfields = req.body.updatedfields
    const order_id = req.body._id
    const order = await ORDERS.findById(order_id)
    if(order.length !== 0){
        if(updatedfields.status !== undefined){
        order.status = updatedfields.status
        }
        if(updatedfields.payment_status !== undefined){
            order.payment_status = updatedfields.payment_status
        }
        await order.save()
        return res.status(200).json({"message":"order updated successfully"})
    }
    return res.status(403).json({"message":"order not found"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message":"internal server error"})
}
}

const getOrders=async (req,res)=>{
    try{
        const orders = await ORDERS.find({}).sort({"createdAt": -1})
        return res.status(200).json(orders)
    }catch(err){
            console.log(err.message)
            return res.status(500).json({"message":"internal server error"})
        }
}

const getallProducts=async (req,res)=>{
    try{
    const products = await PRODUCTS.find({}).sort({createdAt:-1})
    return res.json(products)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: "internal error"})
    }
}

const updateUser=(req,res)=>{

}

const orderDetails=async(req,res)=>{
    const order_id = req.params.id
        try{
        const orderdata = await ORDERS.findOne({_id:order_id})
        if(orderdata){
            return res.status(200).json({orderdata})
        }else{
            return res.status(404).json({"message":"order not found"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }   
}

module.exports = {updateOrder,createProduct,createUser,deleteProduct,
    updateProduct,getOrders,getallProducts,productDetails,orderDetails,getallUsers}