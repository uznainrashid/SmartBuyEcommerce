import React, { useContext ,useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const { Products }=useContext(ShopContext)
    const [latestProducts,setLatestProducts]=useState([])
    
    useEffect(()=>{
        setLatestProducts(Products.slice(0,10));
    },[Products])
    
  return (
    <div className='my-10'>
      <div className='text-center py-6 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='text-gray-600 text-xs sm:text-sm md:text-base m-auto w-3/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum commodi dolore fugiat.</p>
      </div>
      {/* rendering the products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection