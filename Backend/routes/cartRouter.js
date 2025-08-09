import express from "express"
import { AddToCart, GetToCart, updateToCart } from "../Controllers/cartController.js"
import authUser from "../Middleware/authUser.js"

const cartRouter = express.Router()
cartRouter.post("/add", authUser,AddToCart)
cartRouter.post("/update", authUser,updateToCart)
cartRouter.post("/get", authUser, GetToCart)

export default cartRouter