import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {Products} = useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])


    useEffect(()=>{
        const bestProduct=Products.filter((item)=>(item.bestSeller));
        setBestSeller(bestProduct.slice(0,5))
    },[Products])
    


  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-6'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='text-gray-600 text-xs sm:text-sm md:text-base m-auto w-3/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et ex modi!</p>

        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5' >
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>

    </div>
  )
}

export default BestSeller