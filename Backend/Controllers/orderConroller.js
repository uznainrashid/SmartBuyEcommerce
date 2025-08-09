import orderModel from "../Model/orderModel.js";
import userModel from "../Model/UserModel.js"
import Stripe from "stripe"

const currency = "pkr"
const DeliveryCharges = 10


const stripe = new Stripe(process.env.TEST_STRIPE_SECRET_KEY)
// API FOR COD
const placeOrder = async (req, res) => {
    try { 
        const {userId, items, address, amount} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        res.json({
            success:true,
            message: "Order Placed" 
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }


}
// API for StripeMethod
const OrderMethodStripe = async(req,res)=>{
     try {
        const {userId, items, address, amount} = req.body;
        const {origin} = req.headers
          const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data:{
                 name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity:item.quantity,

        }))
        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                 name: "Delivery Charges",
                },
                unit_amount: DeliveryCharges * 100,
            },
            quantity:1 ,

        })
        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            line_items,
            mode:"payment",
        })
        res.json({
            success:true,
            session_url:session.url, 
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
        
    }

}
// API verifyStripe
const verifyStripe =async ( req, res)=> {
 try {
    const {orderId, success, userId} = req.body
    if (success=== "true") {
        await orderModel.findByIdAndUpdate(orderId, {payment:true})
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true})
    }else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({
            success:fale
        })
    }
    
 } catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:error.message
    })
    
    
 }   
}
// API for RozarPay
const OrderMethodRozarpay = async(req,res)=>{

}
// Admin are check The status and update
const updateStatus = async(req,res)=>{
    try{

        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({
            success:true,
            message: "Update The Status"
        })
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }

}
//  all orders Data for Admin Panel
const AllOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({
            success:true,
            orders
        })
        
        
    } catch (error) {
          console.log(error);
    res.json({
        success:false,
        message:error.message
    })
    }
    
}

// All the order are frontend
const userOrder = async(req,res)=>{ 
try {
    const {userId} = req.body;
    const orderData = await orderModel.find(userId)
    res.json({
        success:true,
        orderData
    })
    
} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:error.message
    })
    
    
}

}
export {
    placeOrder,
    OrderMethodRozarpay,
    OrderMethodStripe,
    AllOrder,
    updateStatus,
    userOrder,
    verifyStripe
}