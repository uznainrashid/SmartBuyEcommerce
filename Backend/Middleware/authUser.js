import jwt from "jsonwebtoken"

const authUser = async(req, res, next)=>{
const {token} = req.headers
if (!token) {
    res.status(401).json({
        success:false,
        message: "User are not Authorization for this cart"
    })
}
    try {
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.body.userId = token_decode.id
        next();
    }
    
 catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
        
    
}
}
export default authUser