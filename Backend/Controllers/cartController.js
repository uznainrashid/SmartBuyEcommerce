import userModel from "../Model/UserModel.js"
// User AddToCart In DataBase

const AddToCart = async(req, res )=> {
    try {
        const {userId, itemId, size} = req.body 
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1;
              
                
            }else{
            cartData[itemId][size] = 1 }       
        }
        else{
             cartData[itemId] = {};
                cartData[itemId][size] = 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:  "Add To Cart In Database"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}
// User updateToCart In DataBase

const updateToCart = async(req, res)=> {

    try {
        const {userId, itemId,size, quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity;
            await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:  "Update To Cart In Database"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }

}
// User getcart In DataBase

const GetToCart = async(req, res )=> {
    try {
        const { userId } = req.body  
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData  
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}
export {
    AddToCart,
    updateToCart,
    GetToCart
}