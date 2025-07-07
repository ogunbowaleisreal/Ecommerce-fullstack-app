const PRODUCTS = require('../model/products');
const ORDERS = require('../model/orders');
const REVIEWS = require('../model/reviews');
const CART = require('../model/carts');

const getallfeaturedProducts=async(req,res)=>{
    return res.status(200).json({"message": "all featured products here"})
}

const getcartItems = async(req,res)=>{

    try{
    const cart_id = req.user_id
    const cart = await CART.findOne({user_id: cart_id},{Products: 1}).populate("Products.product_id")
    let totalPrice = 0
    
    if(cart && cart.Products.length > 0){
        for(const items of cart.Products){
            const product = await PRODUCTS.findOne({_id:items.product_id})
            if(product){
                totalPrice+= product.Price
            }
        }
        return res.status(200).json({cart,totalPrice})
    }
    return res.status(404).json({"message":"no items in cart yet"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}
}

const createoraddCart = async(req,res)=>{
    try{   
    const user_id = req.user_id
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    if (isNaN(quantity) || quantity <= 0){
       return res.status(400).json({ message: "Invalid quantity" });
  }
    const cart = await CART.findOne({user_id:user_id})
    const product = await PRODUCTS.findOne({_id: product_id})
        if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const stockQuantity = product.quantity
    if(cart){
        /* if item is already in cart*/
    for(const items of cart.Products){

        if(items.product_id.equals(product_id)){
            if(items.quantity + quantity<= stockQuantity){
        items.quantity += quantity
        await cart.save()
        return res.status(200).json({"message":"product added to cart"})
            }
            return res.status(403).json({"message":"quantity exceeds available stock"})
        }
    }
    // item is not already in cart but cart contains other items
    if(quantity<= stockQuantity){
     cart.Products.push({product_id: product_id, quantity:quantity})
    await cart.save()
    }
     return res.status(403).json({"message":"quantity exceeds available stock"})
    }else{
        //there isnt any cart for the user , new one has to be created
    if(quantity<= stockQuantity){        
        const newCart = await CART.create({user_id: user_id,Products:[{product_id: product_id, quantity:quantity}]})
        if(newCart){
            return res.status(200).json({"message":" cart created and first item added"})
        }
    } return res.status(403).json({"message":"quantity exceeds available stock"})
    }
   }catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}
}

const getbyFilter=async(req,res)=>{
    try{

    const userFilter = req.body.filter
    const products = await PRODUCTS.find({category:{$in: userFilter}})
    if(products.length !== 0){
        return res.status(200).json(products)
    }
    return res.status(403).json({"message": "no products with chosen filters"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message":"internal server error"})
}
}

const createOrder = async(req,res)=>{

    try{
    const user_id = req.user_id
    const products= req.body.productsarray
    const orderItems = []
    let total = 0
    for (const item of products){
        const product = await PRODUCTS.findById(item.product_id)
        if(product && product.discounted_price !== product.Price){
            const price = product.discounted_price
            const quantity = item.quantity
            total = total + price*quantity
            orderItems.push({"product_id":item.product_id,
                 "quantity":quantity, 
                 "price":price})
        }
        else if (product){
            const price = product.Price
            const quantity = item.quantity
            total+= price*quantity
            orderItems.push({"product_id":item.product_id,
                 "quantity":quantity, "price":price})
        }else{
            continue
        }
    }
    if(orderItems.length == 0){
    return res.status(404).json({"message":"products not found"})
    }
        console.log(orderItems)
    const order = await ORDERS.create({user_id:user_id,products:orderItems,totalAmount:total,})
    if(order){
        return res.status(200).json({"message":"order successfully made"})
    }
    return res.status(500).json({"message":"internal server error"})
}catch(err){
    console.log(err)
    return res.status(403).json({"message": "some products not available"})
}
}

const getuserOrders=async(req,res)=>{
    try{
    const user_id = req.user_id
    const orders = await ORDERS.find({user_id:user_id})
    if(orders.length == 0){
        return res.status(404).json({"message":"no orders yet"})
    }
    return res.status(200).json(orders)
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }
}

const increaseproductQuantity=async(req,res)=>{
    const product_id = req.body.product_id;
    const type = req.body.type;
    const user_id = req.user_id;
    const cart = await CART.findOne({user_id:user_id})
    const product = await PRODUCTS.findById(product_id)
    if(!product){
        return res.status(404).json({"message":"product not found"})
    }
    const stockQuantity = product.quantity
    try{
            for(const item of cart.Products){
            if(item.product_id.equals(product_id)){
                if(item.quantity+1 <= stockQuantity && item.quantity-1 > 0){
                type == "increase"? item.quantity += 1: item.quantity -= 1;
                await cart.save()
                const newQuantity = item.quantity +=1
                return res.status(200).json({"message": "stock updated","newQuantity":newQuantity})
            }
            return res.status(403).json({"message":"Not Allowed "})
        }
        }
        return res.status(404).json({"message":"product not found"})
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"internal server error"})
    }
}

const deletecartItem =async (req,res)=>{

    try{
    const user_id = req.user_id
    const product_id = req.body.product_id
    const userCart = await CART.findOne({user_id: user_id})
    const allProducts = userCart.Products
    for(const items of allProducts){
        if(items.product_id.equals(product_id)){
           const newCart= userCart.Products.filter((item)=>{return !item.product_id.equals(product_id)})
           userCart.Products = newCart
            await userCart.save()
        return res.status(200).json({"message":"product successfully deleted"})
        }
    }
     return res.status(403).json({"message": "product not found"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message":"internal server error"})
}
}

const createReviews = async(req,res)=>{

    try {
        const { product_id, comment, review } = req.body;
        const user_id = req.user_id;
        const duplicateReview = await REVIEWS.findOne({product_id:product_id, user_id:user_id})
        const productboughtCheck = await ORDERS.findOne({user_id: user_id,
            products:{$elemMatch:{product_id:product_id}}})

        console.log(productboughtCheck)
        if(duplicateReview || productboughtCheck.lenght == 0 ){
            return res.status(403).json({"message": "not allowed"})
        }
        const newReview = await REVIEWS.create({
            product_id,
            user_id,
            comment,
            review
        });

        if (newReview){
            return res.status(201).json({ message:
                 "Review created successfully", review: newReview });
        } else {
            return res.status(400).json({ message: 
                "Failed to create review" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteReview = async(req,res)=>{

    try{
    const user_id = req.user_id
    const review_id = req.body._id
    const review = await REVIEWS.findById(review_id)

    if(user_id !== review.user_id){
        return res.status(403).json({"message":"cant delete other reviews"})
    }
    const reviewdelete = await REVIEWS.findByIdAndDelete(review_id)
    if(reviewdelete){
        return res.status(200).json({"message": " review successfully deleted"})
    }
    return res.status(403).json({"message": " not found "})
}catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}
}

const updateReview = async(req,res)=>{
    try{
    const updateFields = req.body.updateParams
    const user_id = req.user_id
    const review_id = req.body._id
    const review = await REVIEWS.findById(review_id)
    const filter = {}

    if(user_id !== review.user_id){
        return res.status(403).json({"message":"cant delete other reviews"})
    }
    if(updateFields.comment !== undefined){
        filter.comments = updateFields.comment
    }
    if(updateFields.review !== undefined){
        filter.review = updateFields.review 
    }

    const update = await REVIEWS.updateOne({_id: review_id},{$set : filter})
    if(update.acknowledged == true){
        return res.status(200).json({"message": "review updated successfully"})
    }
}catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}
}

module.exports = {createReviews,getallfeaturedProducts,deleteReview
    ,updateReview,getuserOrders,getbyFilter,createOrder, getcartItems,
     createoraddCart,deletecartItem,increaseproductQuantity};