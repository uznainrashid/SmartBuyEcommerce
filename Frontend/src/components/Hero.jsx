import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* left side  */}
        <div className='flex items-center justify-center w-full sm:w-1/2 py-6 md:py-0'>
        <div className='text-[#414141]'>
            
            <div className='flex items-center  gap-2 sm:gap-3 md:gap-4'>
                <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>BEST SELLERS</p>
            </div>
            <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular'>LATEST ARRIVALS</h1>
            <div className='flex items-center  gap-2 sm:gap-3 md:gap-4'>
                <p className='font-medium text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>

            </div>
        </div>

        </div>
        {/* right side */}
        
            <img className='w-full sm:w-1/2 ' src={assets.hero_img} alt="" />
        

    </div>
  )
}

export default Hero