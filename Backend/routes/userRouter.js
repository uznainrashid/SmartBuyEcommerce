import express from "express"
import { LoginUser, AdminUser, SignupUser} from "../Controllers/usercontroller.js"


const userRouter = express.Router(); 
  

userRouter.post("/login", LoginUser)
userRouter.post("/signup", SignupUser) 
userRouter.post("/admin", AdminUser)

export default userRouter
 