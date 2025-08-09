import React from 'react'

const NewsletterBox = () => {
    const onSubmit=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='font-semibold text-2xl  text-gray-800'>Subcribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, deleniti aliquid, hic id placeat excepturi rerum, quod obcaecati ullam cumque laboriosam vitae voluptate fugit? Officia officiis tempore cumque voluptate neque.
        </p>
        <form onSubmit={onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
            <input type="email" placeholder='Enter Your Email' required className='w-full sm:flex-1 outline-none' />
            <button type='submit' className='bg-black text-white text-xs  px-5 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox