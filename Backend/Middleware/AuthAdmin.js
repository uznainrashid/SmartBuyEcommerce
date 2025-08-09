import jwt from "jsonwebtoken"


const AuthAdminMiddleWare = async (req, res, next) =>{
try {
    const { token  } = req.headers
    if (!token) {
      return  res.status(401).json({
            success:false,
            message:"Token Missing. Login Again " 
        })
    }
    const token_decode = jwt.verify(token, process.env.JWT_TOKEN)
   if (token_decode !== process.env.ADMIN_ID + process.env.ADMIN_PASS ) {
      return res.status(403).json({
            success:false,
            message:"User Not Authorized. Login Again "
        })
    }
    next();
} catch (error) {
            console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error" 
    })
}
}

export default AuthAdminMiddleWare