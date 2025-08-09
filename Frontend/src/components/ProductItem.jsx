import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,name,image,price}) => {
    const {currency , products} = useContext(ShopContext)
    

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img src={image[0]} className='hover:scale-110 transition ease-in' alt="" />
        </div>
        <p className='pt-2 pb-1 text-sm'>{name}</p>
        <p className='font-medium text-sm'>{currency}{price}</p>
     
    </Link>
  )
}

export default ProductItem