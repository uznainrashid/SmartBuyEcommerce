import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./Config/mongodb.js";
import ConnectCloudinary from "./Config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js" 

// App Config
const app = express();
const port = process.env.PORT || 4000; 
ConnectDB(); 
ConnectCloudinary(); 

// Middleware (should come before routes)
app.use(cors());
app.use(express.json()); // in case you want to parse JSON bodies



// Route

app.use("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/user", userRouter)  
app.use("/api/product", productRouter)  
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)  


 
 app.listen(port, () => {
      console.log(`✅ Server is listening on port ${port}`);
    });

