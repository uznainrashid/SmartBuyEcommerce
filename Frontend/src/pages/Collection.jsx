import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets.js'
import Title from '../components/Title.jsx'
import { ShopContext } from '../context/ShopContext.jsx'
import ProductItem from '../components/ProductItem.jsx'

const Collection = () => {
  const [showfilter,setShowfilter]=useState(false)
  const {Products,search ,showSearch}=useContext(ShopContext)
  const [filterProducts,setFilterProducts]=useState([])
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState('relavent')
  //toggle category functions

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev =>[...prev,e.target.value])
    }
  }
  //toggle subcategory fuctions

  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }
  //apply filter option
  const applyFilter=()=>{
    let productsCopy=Products.slice();
    if(category.length >0){
      productsCopy=productsCopy.filter(item => category.includes(item.category))

    }
    if(showSearch && search){
      productsCopy= productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(subCategory.length > 0){
      productsCopy=productsCopy.filter(item => subCategory.includes(item.subcategory))
      
    }
    setFilterProducts(productsCopy)
  }
  //apply  sort product by price options

  const sortProducts=()=>{
    let fpCopy=filterProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break  
    
      default:
        applyFilter()
        break;
    }
  }
  
  useEffect(()=>{
    setFilterProducts(Products)
  },[])
  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch, Products])
  useEffect(()=>{
    sortProducts()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filters options */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img onClick={()=>setShowfilter(!showfilter)} src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter ? 'rotate-90':'' }`} alt="" />
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Men'}  onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Kids'}  onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        {/* subCategories */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Topwear'}  onChange={toggleSubCategory}  />Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Bottomwear'}  onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Winterwear'}  onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* PRODUCT SORT OPTIONS */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:low to high</option>
            <option value="high-low">Sort by:high to low</option>
          </select>

        </div>
        {/* map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}  />
            ))


          }

        </div>

      </div>

    </div>
  )
}

export default Collection