import {v2 as cloudinary} from "cloudinary"
import productModel from "../Model/ProductModel.js"
// Add Product
const addProduct = async (req,res) => {

    try {
        const { name, description,price, category,subcategory,sizes,bestSeller} = req.body
        const image1 = req.files.image1 && req.files.image1[0] 
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        
        const images = [image1, image2, image3, image4].filter((items)=> items !== undefined)

      // console.log("Uploading to Cloudinary...");
        
        let imageUrl = await Promise.all(  
          images.map(async (items) => {
              const result = await cloudinary.uploader.upload(items.path, {resource_type: "image" })
              return result.secure_url; 
          }
        )
        )
  const productData = {
    name:name,
    description: description, 
    category,
    subcategory,
    price:Number(price),
    bestSeller : bestSeller === "true" ? true : false,
    image : imageUrl,
    sizes:JSON.parse(sizes),
    date : Date.now()
  }
  const products = new productModel(productData)

     await products.save();     
  res.status(201).json({success: true, message: "Product added to the database successfully"})
        
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false, message:"Internal Server Error"})
      
        
    }

  }
//   product list
  const ProductList = async (req,res) => {
try {
  const products = await productModel.find({})
   res.status(201).json({
  success: true,
 products
}); 
} catch (error) {
  console.log(error);
      res.status(500).json({success:false, message:"Internal Server Error"})
}

  }
//   Delete product
  const removeProduct = async (req,res) => {
    try{

      
      await productModel.findByIdAndDelete(req.body.id);
      res.status(200).json({
        success:true,
        message: "delete product successfully in database 💖"
      })
    }catch(error){
       console.log(error);
      res.status(500).json({success:false, message:"Internal Server Error"})
    }


  }
//   Product Infomation
  const SingleProduct = async (req,res) => {
    try {
      const {productId} = req.body
      const productInfo = await productModel.findById(productId)
         res.status(200).json({
        success:true,
        productInfo
      })

      
    } catch (error) {
       console.log(error);
      res.status(500).json({success:false, message:"Internal Server Error"})
    }

  }
  export {
    addProduct,SingleProduct,removeProduct,ProductList
  }