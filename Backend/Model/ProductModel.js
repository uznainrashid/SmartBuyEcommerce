import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name : {type: String , required: true},
    description : {type: String , required: true},
    image : {type: Array , required: true},
    price : {type: Number , required: true},
    category : {type: String , required:true},
    subcategory : {type: String , required:true}, 
    sizes : {type: Array , required: true}, 
    bestSeller : {type : Boolean},   
     date : {type : Number,  required: true}
})
const productModel = mongoose.models.Products || mongoose.model("Products", productSchema);
export default productModel;