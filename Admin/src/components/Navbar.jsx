import React from 'react'
import  { assets } from "../assets/assets"
import { toast } from 'react-toastify'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <img className='w-[max(10%,80px)] cursor-pointer' src={assets.logo} alt="forever"  />
        <button onClick={()=>setToken("", toast.error("Logout Successfully"))} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-900'>Logout</button>
    </div>
  )   
}

export default Navbar 