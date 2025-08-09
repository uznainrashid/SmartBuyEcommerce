import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { BackendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Orders = ({token}) => {
  const [Orders, setOrders] = useState([])
    const fectchOrderData = async()=>{
      try {
        if (!token) {
          return null;
        }
        const response = await axios.post(BackendURL + "/api/order/list", {}, {headers:{
          token
        }})
        if (response.data.success) {
          setOrders(response.data.orders) 
        }  
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)   
      }

    }
    const statusHandler = async(event, orderId)=>{
      try {
        const response = await axios.post(BackendURL+"/api/order/status",{orderId, status:event.target.value}, {
          headers:{
            token
          }
        })
        if (response.data.success) {
          await fectchOrderData()
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }

    }
    useEffect(()=>{
      fectchOrderData()

    },[token])

  return (
    <div>
      <div>
        <h3>Order Page</h3>
      </div>
      {Orders.map((order,index)=>(
      <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-3 border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700  ' key={index}>
        <img className='w-12' src={assets.parcel_icon} alt="" srcset="" />
        <div>
          <div>
          {order.items.map((item,index)=>{
            if(index === order.items.length-1) {
              return <p className=' py-0.5'  key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>  
            } else{
              return <p  className=' py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span></p>
            }
          }
        )}
        </div>
        <p className='mt-2 mb-2 font-bold'>{order.address.fname +" " + order.address.lname}</p>
        <div>
          <p>{order.address.street+","}</p>
          <p>{order.address.city + "," + order.address.state+ ", " + order.address.country}</p>
        </div>
        <p>{order.address.phone}</p>
        </div>
        <div>
          <p className='text-sm sm:text-[15px]'>items : {order.items.length}</p>
          <p className='mt-3'>Method : {order.paymentMethod}</p>
          <p>Payment : {order.payment ? "Done": "Pending"}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>
        <p className='text-sm sm:text-[15px]'>Amount: {currency}{order.amount}</p>
        <select onChange={(event)=> statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold' >
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Order Cancel">Order Cancel</option>
        </select>
      </div>
))}
    </div>
  )
}

export default Orders