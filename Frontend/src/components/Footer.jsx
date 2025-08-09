import React from 'react'
import {assets} from '../assets/assets.js'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='w-32 mb-5' alt="" />
            <p className='w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ab rem vel iste illum assumenda fugiat aperiam quia corporis sequi ex, mollitia aspernatur amet sit blanditiis dolore sint saepe consectetur?</p>
        </div>
        <div>
            <p className='font-medium text-xl mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-800'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About Us</li>
                <li className='cursor-pointer'>Delivery</li>
                <li className='cursor-pointer'>Policy</li>
            </ul>
        </div>
        <div>
            <p className='font-medium text-xl mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-800'>
                <li className='font-semibold cursor-pointer'>Phone: +923089245646</li>
                <li className='font-semibold cursor-pointer '>Email: uznainrashid5@gmail.com</li>
                
            </ul>
        </div>
        
        
    </div>
  )
}

export default Footer