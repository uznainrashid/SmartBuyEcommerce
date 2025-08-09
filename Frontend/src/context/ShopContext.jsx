import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"


 const backendURL =import.meta.env.VITE_BACKEND_URL;

 export const ShopContext=createContext();
 const ShopContextProvider=(props)=>{
    const navigate = useNavigate()
    const currency='$';
    const [search,setSearch]=useState('')
    const [Products, setProducts] = useState([])
    const [showSearch,setShowSearch]=useState(false)
    const delivery_fee=10;
    const [CartItem, setCartItem] = useState({})
    const [token, setToken] = useState("")
    

    const AddToCart = async (itemId, size)=> {
              let cartData = structuredClone(CartItem);
              if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size]+=1      
                }
                else{
                    cartData[itemId][size] = 1;
                }      
            }
            else{
                cartData[itemId] = {};
                cartData[itemId][size] = 1;

            }
            setCartItem(cartData)
            if (token) {
                try {
                await axios.post(backendURL+ "/api/cart/add" , {itemId,size}, {headers: {token}} )
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                    
                }
                
            }
    }
    const GetCartData = ()=>{
        let totalCount = 0;
        for(const items in CartItem)
            for(const item in CartItem[items]){
        if (CartItem[items][item]>0) {
            totalCount+=CartItem[items][item]
            
        }
        }
        return totalCount
     }
const getCartAmount = ()=>{
    let totalAmount = 0;
    for(const items in CartItem){
      let itemInfo = Products.find((product)=>product._id===items)
      for(const item in CartItem[items]){
        try {
          if(CartItem[items][item]>0){
            totalAmount += itemInfo.price * CartItem[items][item];
          }
        } catch (error) {  
        }
      }
    }
    return totalAmount;

  }

 const fetchProducts = async()=>{
    try {
        const response = await axios.get(backendURL + "/api/product/list")
        if (response.data.success) {
        setProducts(response.data.products)     
        } else {
            toast.error(response.data.message) 
               }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
    }
 }
 const updateQuantity = async (itemId, size, quantity)=>{
    let cartData = structuredClone(CartItem)
    cartData[itemId][size]=quantity;
    setCartItem(cartData);
     if (token) {
                try {
                const response =  await  axios.post(backendURL+ "/api/cart/update" , {itemId,size,quantity}, {headers: {token}} )
                if (response.data.success) {
                    toast.success(response.data.message)
                    
                }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                    
                }
                
            }

 }
 const getUserCart = async (token)=>{
    try {
    const response = await  axios.post(backendURL + "/api/cart/get" , {}, {headers: {token}} )
    if (response.data.success) {
        setCartItem(response.data.cartData)
    }
    } catch (error) {
        console.log(error);
       toast.error(error.message);
    }

 }
 useEffect(()=>{
fetchProducts()
 },[])
 useEffect(()=>{
if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"))
    getUserCart(localStorage.getItem("token"))
}
 },[])
 
    const value={
        Products,
        currency,
        delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        AddToCart,GetCartData,backendURL,CartItem,updateQuantity,token,setToken,navigate,getCartAmount
        , setCartItem
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
 }
 export default ShopContextProvider;