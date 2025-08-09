import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrders = () => {
  const {navigate, token, setCartItem , backendURL, CartItem, getCartAmount, delivery_fee, Products}=useContext(ShopContext)
  const [method,setMethod]=useState('cod')
  const [formData , setFormData] = useState({
    fname: "",
    lname: "",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setFormData(data=> ({
      ...data,
      [name]:value,
    }))

  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
      let orderItems = []
      for(const items in CartItem){
        for(const item in CartItem[items] ) {
          if (CartItem[items][item]>0) {
            const itemInfo = structuredClone(Products.find(product=> product._id === items ))
            if (itemInfo) {
              itemInfo.size = item,
              itemInfo.quantity = CartItem[items][item]
              orderItems.push(itemInfo)
            }
           
          }
            
          }
      }
    const orderData = {
      items: orderItems,
      address:formData,
      amount: getCartAmount() + delivery_fee,
    }
   switch(method) {
    case "cod":
       const response = await axios.post(backendURL+ "/api/order/placeorder", orderData, {headers:{
      token
    }})
    if (response.data.success) {
      toast.success(response.data.message)
      setCartItem({})
      navigate("/orders")
      
    } else {
      toast.error(response.data.message)
    }
        break;
        case "Stripe":
          const responseStripe = await axios.post(backendURL+ "/api/order/Stripe", orderData, { headers:{
            token
          }})         
          if (responseStripe.data.success) {
            
            const {session_url} =responseStripe.data
            console.log(session_url);
            window.location.replace(session_url)  
          }else{
            toast.error(responseStripe.data.message)
          }

        break;



    default:
      break;
   }
    
      
    } catch (error) {
      console.log(error);
    toast.error(error.message)
      
      
    }

  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-8 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='w-full flex flex-col gap-4 sm:max-w-[470px]'>
        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='fname' value={formData.fname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required  onChange={onChangeHandler} name='lname' value={formData.lname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input  required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='ZipCode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />

        <div>

        </div>

      </div>
      {/* right side */}
      <div className='mt-2'>
        <div className='mt-2 min-w-80'>
          <CartTotal/>

        </div>
        <div className='mt-1'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('Stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3.5 border rounded-full ${method==='Stripe'?'bg-green-400':'' } `}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />

            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':'' }`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />

            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3.5 border rounded-full ${method==='cod'? 'bg-green-400' :'' } `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>

            </div>
          </div>
          <div className='w-full text-end mt-5'>
           <button type='submit'  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>

        </div>
        </div>
        </form>

  )
}

export default PlaceOrders