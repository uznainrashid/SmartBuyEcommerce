import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { BackendURL } from "../App"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Add = ({token}) => {
  const navigate = useNavigate()

 const [image1, setImage1] = useState(false)
 const [image2, setImage2] = useState(false)
 const [image3, setImage3] = useState(false)
 const [image4, setImage4] = useState(false)
 const [name, setName] = useState('')
 const [price, setPrice] = useState('')
 const [description, setDescription] = useState('')
 const [category, setCategory] = useState('Men')
 const [subcategory, setSubcategory] = useState('Topwear')
 const [sizes, setSizes] = useState([])
 const [bestSeller, setBestseller] = useState(false)
 

 const onSubmitHandler = async(e)=>{
   e.preventDefault();
  try {
    const formdata = new FormData();
    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("price", price)
    formdata.append("category", category)
    formdata.append("subcategory", subcategory)
    formdata.append("bestseller", bestSeller)
    formdata.append("sizes", JSON.stringify(sizes))
    image1 && formdata.append("image1", image1)
    image2 &&formdata.append("image2", image2)
    image3 && formdata.append("image3", image3)
    image4 && formdata.append("image4", image4)
    const response = await axios.post(BackendURL+ "/api/product/add", formdata, {headers:{
      token
    }})
    if (response.data.success) {
      toast.success(response.data.message)
      
      navigate("/list")
    }
    
  } catch (error) {
           toast.error(error?.response?.data?.message);
  }
 }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-3 w-full' >
      <div>
        <p className='mb-2 font-medium text-black'>Upload Image</p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-20 cursor-pointer'  src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""   />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
        </label>
         <label htmlFor="image2">
          <img className='w-20 cursor-pointer'  src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""   />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id="image2" hidden />
        </label>
         <label htmlFor="image3">
          <img className='w-20 cursor-pointer'  src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""   />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id="image3" hidden />
        </label>
         <label htmlFor="image4">
          <img  className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""   />
          <input onChange={(e)=>setImage4(e.target.files[0])}  type="file"  id="image4" hidden />
        </label>
      </div>
      </div>
      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here...' required />
      </div>
      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here...' required ></textarea>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row w-full sm:gap-8'>
        <div>
          <p className='mb-2 font-medium'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select onChange={(e)=>setSubcategory(e.target.value)} className='w-full px-3 py-2' >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='font-medium mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} className='px-3 py-2 w-full sm:max-w-[120px]' type="number" placeholder='25' />
        </div>
      </div>
      <div className=''>
        <p className='mb-2 font-medium'>Product Sizes</p>
       <div className='flex gap-3'>

          <div onClick={()=> setSizes(prev=> prev.includes("S")? prev.filter(items=> items!=="S") : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div> 

          <div onClick={()=> setSizes(prev=> prev.includes("M") ? prev.filter(items=> items!=="M") : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=> setSizes(prev=> prev.includes("L") ? prev.filter(items=> items!=="L") : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
        
          <div onClick={()=> setSizes(prev=> prev.includes("XL") ? prev.filter(items=> items!=="XL") : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
      
          <div onClick={()=> setSizes(prev=> prev.includes("XXL") ? prev.filter(items=> items!=="XXL") : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        
       </div>
      </div>
      <div className='flex mt-2 gap-1 items-center'>
        <input onChange={()=> setBestseller(prev=> !prev)} checked={bestSeller} className='w-5 cursor-pointer ' type="checkbox"  id="bestSeller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add To BestSeller</label>
      </div>
      <button className='w-28 bg-black px-5 py-2 text-white rounded-md cursor-pointer' type='submit'>ADD</button>
    </form>
  )
}

export default Add