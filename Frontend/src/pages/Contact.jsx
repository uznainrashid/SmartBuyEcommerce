import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 '>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" srcset="" />
              <div className='flex flex-col justify-center items-start gap-6'>
               <p className='font-semibold text-xl text-gray-600'> Our Store</p>
               <p className='text-gray-500'>54706 Willin Station <br />Suit 450 WashingTon, USA </p>
               <p className='text-gray-500'>Tel: +923089245646 <br />Email: uznainrashid5@gmail.com </p>
               <p className='text-gray-600 text-xl font-semibold'>Careers at SmartBuy Ecommerce</p>
               <p className='text-gray-500'>Learn more about our teams and jobs openings.</p>
               <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact