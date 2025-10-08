const PRODUCTS = require('../model/products');
const ORDERS = require('../model/orders');
const REVIEWS = require('../model/reviews');
const CART = require('../model/carts');
const products = require('../model/products');

const getallfeaturedProducts=async(req,res)=>{
    return res.status(200).json({"message": "all featured products here"})
}

const getcartItems = async(req,res)=>{
    try{

    const user_id = req.user_id
    console.log(user_id)
    const cart = await CART.findOne({user_id: user_id},{Products: 1}).populate("Products.product_id")
    let totalPrice = 0    
    if(cart && cart.Products.length > 0){
        for(const items of cart.Products){
            const product = await PRODUCTS.findOne({_id:items.product_id})
            if(product){
                totalPrice+= (product.Price * items.quantity)
            }else{
                console.log(product)
                cart.Products = cart.Products.filter((item)=>item.product_id !== null)
            }
        }
        await cart.save()
        console.log(cart)
        return res.status(200).json({user_id,cart,totalPrice,"status":200})
    }
    const emptyCart = {Products:[]}
    return res.status(200).json({"message":"no items in cart yet",cart:emptyCart})
}catch(err){
    console.log(err)
    return res.status(500).json({"message": "internal server error"})
}
}

const createoraddCart = async(req,res)=>{
    try{   
    const user_id = req.user_id
    const product_id = req.body.product_id
    console.log(product_id)
    const cart = await CART.findOne({user_id:user_id})
    const product = await PRODUCTS.findOne({_id: product_id})
        if (!product) {
      return res.status(404).json({message: "Product not found" });
    }
    const stockQuantity = product.quantity
    if(cart){
        /* if item is already in cart*/
    for(const items of cart.Products){

        if(items.product_id.equals(product_id)){
            if(items.quantity + 1<= stockQuantity){
        items.quantity += 1
        await cart.save()
        return res.status(200).json({"message":"quantity increased"})
            }
            return res.status(403).json({"message":"quantity exceeds available stock"})
        }
    }
    // item is not already in cart but cart contains other items
    if(stockQuantity >= 1){
     cart.Products.push({product_id: product_id, quantity:1})
    await cart.save()
    return res.status(200).json({ cart, message: "product added to cart" ,user_id});
    }
     return res.status(403).json({"message":"quantity exceeds available stock"})
    }else{
        //there isnt any cart for the user , new one has to be created
    if(stockQuantity >= 1){        
        const newCart = await CART.create({user_id: user_id,Products:[{product_id: product_id, quantity:1}]})
        if(newCart){
            return res.status(200).json({"cart":newCart,"message":" cart created and first item added", user_id})
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
        const userFilter = req.body.newFilter
        let bodyFilter = []
        for(const item of Object.entries(userFilter)){
            if(item[1]){
                bodyFilter.push(item[0])
            }
        }
        if(bodyFilter.length == 0){
            const products = await PRODUCTS.find({}).sort({createdAt:-1})
            return res.status(200).json(products)
        }
    const products = await PRODUCTS.find({category:{$in: bodyFilter}}).sort({createdAt:-1})
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
    const cart = await CART.findOne({user_id:user_id}).populate('Products.product_id')
    const product = await PRODUCTS.findById(product_id)

    if(!cart){
        return res.status(404).json({"message":"cart not found"})
    }

    if(!product){
        return res.status(404).json({"message":"product not found"})
    }
    const stockQuantity = product.quantity
    console.log(stockQuantity)
    try{
            for(const item of cart.Products){
            if(item.product_id.equals(product_id)){
                if(type == "increase" && item.quantity+1 <= stockQuantity){ 
                item.quantity += 1
                await cart.save()
                return  res.status(200).json({"message":"added one ",cart:cart});
                }
                if(type == "decrease"){
                    if(item.quantity>1){
                        item.quantity -= 1
                        await cart.save()
                   return  res.status(200).json({"message":"removed one",cart:cart});
                    }
                    return res.status(403).json({"message":"Not Allowed "})
                }
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
    const product_id = req.params.id
    console.log(product_id)
    const userCart = await CART.findOne({user_id: user_id})
    if(!userCart){
        return res.status(404).json({"message": "cart not found"})
    }
    const allProducts = userCart.Products
    console.log(allProducts)
    for(const items of allProducts){
        if(items.product_id.equals(product_id)){
           const newCart= userCart.Products.filter((item)=>{return !item.product_id.equals(product_id)})
           userCart.Products = newCart
            await userCart.save()
        return res.status(200).json({"message":"product successfully deleted",total:userCart.total})
        }
    }
     return res.status(404).json({"message": "product not found"})
}catch(err){
    console.log(err)
    return res.status(500).json({"message":"internal server error"})
}
}

const createReviews = async(req,res)=>{

    try {
        const product_id = req.params.id
        const review_id = req.body.review_id
        console.log(product_id)
        const { comment, review } = req.body;
        const user_id = req.user_id;
        const duplicateReview = await REVIEWS.findOne({product_id:product_id, user_id:user_id})
        const productboughtCheck = await ORDERS.findOne({user_id: user_id,
            products:{$elemMatch:{product_id:product_id}}})

        console.log(productboughtCheck)
       /* if(duplicateReview){
            return res.status(403).json({"message": "not allowed"})
        }*/
        const newReview = await REVIEWS.create({
            product_id,
            user_id,
            comment,
            review
        });

        if (newReview){
            const populatedReview = await REVIEWS.findById(newReview._id).populate('user_id','username')
            console.log(populatedReview)
            return res.status(200).json({ message:
                 "Review created successfully", review: populatedReview });
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

const getAllReviews = async(req,res)=>{
    try{
    const product_id = req.params.id
    if(!product_id){
        return res.status(403).json({"status":403,"message": "credentials not found"})
    }
    const reviews = await REVIEWS.find({product_id : product_id}).sort({createdAt:-1}).populate('user_id')
    if(reviews.length > 0){
        return res.status(200).json({"status":200,"message":"reviews sent" ,reviews})
    }
}catch(err){
    console.log(err)
}
}

module.exports = {createReviews,getallfeaturedProducts,deleteReview
    ,updateReview,getuserOrders,getbyFilter,createOrder, getcartItems,
     createoraddCart,deletecartItem,increaseproductQuantity};