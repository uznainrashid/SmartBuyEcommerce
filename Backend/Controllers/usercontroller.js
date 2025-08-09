import userModel from "../Model/UserModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


 
const createToken = async (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN) 
}

   

//    Route for loginuser 
const LoginUser= async (req, res) => { 
try {
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
        return res.status(400).json({
            success:false,
            message:"Email does not exist"
        })
        
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
        const token = await createToken(user._id)
        return res.status(201).json({
            success:true,
            token
        })
    }
    else{
        res.status(403).json({success:false,message:"Invalid Creditionals Error"})
    }
} catch (error) {
    console.log(error);
       res.status(500).json({
        success:false,
        message:"Internal Server Error" 
    })
    
}   
}

//    Route for loginuser 
const SignupUser= async (req, res) => {
    try{
    const {name, email, password} = req.body;
    const exist  = await userModel.findOne({email})
    if (exist) {
     res.status(409).json({success:false, message: "Email already exist please login"})  
    }
    if (!validator.isEmail(email)) {
        return res.status(403).json({success:false, message:"Please Enter your valid email"})
        
    }
    if (password.length < 8) {
        res.status(403).json({success:false, message: "Please Enter Strong Password"})
    }
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
     const newUser = new userModel({name, email, password : hashedPassword})

     const user = await newUser.save()
     const token = await createToken(user._id)
     res.status(201).json({success:true, token})
}catch(error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error" 
    })
    
} 

}
//    Route for loginuser 
const AdminUser= async (req, res) => {
    try{
        const {email , password} = req.body
        if (email === process.env.ADMIN_ID && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email+password, process.env.JWT_TOKEN)
           return res.status(201).json({
                success:true,
               token,
               message:"Admin are Login Successfully"
            })
        } else{
          return  res.status(409).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    }catch(error){
            console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error" 
    })
    }
    
}

export {
    LoginUser, AdminUser, SignupUser
}