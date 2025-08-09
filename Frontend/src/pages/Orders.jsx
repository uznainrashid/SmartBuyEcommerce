import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const {backendURL,token,currency}=useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const loadOrderData = async () =>{
    try {
      if (!token) {
        return null
      }else {

        const response =  await axios.post(backendURL+"/api/order/userorders", {},  {headers: {
          token
        }})
        if(response.data.success){
          let orderDataItems = []
          response.data.orderData.map((order)=>{
            
            order.items.map((item)=> {
              // item["amount"] = order.amount,
              item["status"] = order.status,
              item["payment"] = order.payment,
              item["paymentMethod"] = order.paymentMethod,
              item["date"] = order.date,
              orderDataItems.push(item)
            }
          )
        }   
      )
      setOrderData(orderDataItems.reverse())
    }
  }
     
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }
  
  useEffect(()=>{
loadOrderData()
  },[token])
  
  return (
    <div className='border-t pt-10'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          orderData.slice(0,10).map((item,index)=>(
            <div  key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-4 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleString()}</span></p>
                  <p>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p> 
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                {item.status === "Order Cancel" ? (<> <p className='min-w-2 h-2 rounded-full bg-red-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p></> ) :( <> <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p></>) } 
                

              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders