import express from "express"
import { addProduct, ProductList, removeProduct, SingleProduct } from "../Controllers/productController.js";
import upload from "../Middleware/multer.js";
import AuthAdminMiddleWare from "../Middleware/AuthAdmin.js";

const productRouter = express.Router();

  productRouter.post("/add", AuthAdminMiddleWare , upload.fields([{name:"image1", maxCount:1},{name:"image2", maxCount:1},{name:"image3", maxCount:1},{name:"image4", maxCount:1}]), addProduct)
  productRouter.post("/remove", AuthAdminMiddleWare ,removeProduct)
  productRouter.post("/details", SingleProduct)
  productRouter.get("/list", ProductList)
 




export default productRouter