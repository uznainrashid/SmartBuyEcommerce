import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId}=useParams();
  const {Products,currency , AddToCart}=useContext(ShopContext)
  const [productData,setProductData]=useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')
  const fetchProductData= async () => {
    Products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }

    })
  }
  useEffect(()=>{
    fetchProductData()
  },[productId,Products])
  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 flex-col sm:flex-row sm:gap-12'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-2 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-between  sm:w-[18.7%] w-full'>

            {
              productData.image.map((item)=>(
                <img  src={item} onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-1  flex-shrink-0 cursor-pointer' alt="" />

              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>

        </div>
        {/* product datas details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-3'>
            {productData.name}
          </h1>
          <div className='flex items-center gap-1'>
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_dull_icon} className='w-3.5' alt="" />
            <p className='pl-2'>(122)</p>

          </div>
          <p className='mt-5 font-medium text-3xl'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-6'>
            <p>Product Size</p>
            <div className=' flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border bg-gray-100 px-4 py-2 ${item === size ? 'border-orange-500':''}  `}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={()=>AddToCart(productData._id, size)}  className=' px-8 py-3 bg-black text-white text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 text-sm text-gray-700 mt-5'>
            <p>100% Original Product</p>
            <p>Cash on delivery available </p>
            <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>
      {/* description and reviews sections */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Sapiente praesentium porro totam iusto voluptate veritatis molestiae expedita unde similique rerum nam, est obcaecati, illum exercitationem ratione, maxime atque quae perferendis? Voluptas, tempore.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, enim doloremque dolorum rerum, ratione voluptatum natus corporis veritatis quaerat iure nostrum et blanditiis voluptatem cupiditate sunt dicta commodi excepturi. Reprehenderit.</p>
        </div>
      </div>

      {/* related productsssssssssss */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product