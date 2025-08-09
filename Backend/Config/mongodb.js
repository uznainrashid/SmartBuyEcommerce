import mongoose from "mongoose"
 
const ConnectDB = async () => {    
   
  mongoose.connection.on('connected', ()=>{ 
    console.log("MongoDB successfully");   
  })   
  await mongoose.connect(`${process.env.Mongo_URL}`)         
}  
     
export default ConnectDB
 