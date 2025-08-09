import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col sm:flex-row gap-16">
        <img className='w-full md:max-w-[480px] rounded-xl' src={assets.about_img} alt="" srcset="" />
        <div className="flex flex-col gap-6 justify-center md:w-2/3 text-gray-500">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum illo eos modi repellat, perspiciatis nulla fuga officiis odit possimus autem dicta ex ipsa consequatur iste optio maiores numquam obcaecati natus.
        Possimus illo vel eum sunt labore rerum sapiente eligendi repellendus reprehenderit sit iste id, veniam nobis rem, repellat facilis beatae? Dolores deserunt rerum, odio expedita dolor quia? Minus, quis expedita?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum illo eos modi repellat, perspiciatis nulla fuga officiis odit possimus autem dicta ex ipsa consequatur iste optio maiores numquam obcaecati natus.
      d, veMinus, quis expedita?</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, corporis molestias. Mollitia esse unde voluptate blanditiis non maiores iusto distinctio repudiandae? Ex saepe autem fugiat enim dolorem, consectetur cum illum!</p>
  </div>
      </div>
      <div className='tet-xl py-4'>
        <Title text1={"WHY"} text2={"ChOOSE US"}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className='border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, voluptatum! Quaerat possimus repellendus eum veritatis consequatur labore illum placeat mollitia dolorem, id co.</p>

        </div>
        <div className='border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, voluptatum! Quaerat possimus repellendus eum veritatis consequatur labore illum placeat mollitia dolorem, id co.</p>

        </div>
        <div className='border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exepectional Customer Service :</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>

        </div>
      </div>
        <NewsletterBox/>
    </div>
  )
}

export default About