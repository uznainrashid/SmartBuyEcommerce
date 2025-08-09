import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
const [currentState, setCurrentState] =   useState("Login")
const {token, setToken,backendURL,navigate} = useContext(ShopContext)
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const onSubmitHandler =async (e) =>{
  e.preventDefault();
  try {
    if (currentState === "Sign Up") {
      const response = await axios.post(backendURL + "/api/user/signup", {name,email,password})
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
      }else{
        toast.error(response.data.message)
      }
      
    }else{
      const response = await axios.post(backendURL + "/api/user/login", {email,password})
      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        toast.success("Login Successfully")
        navigate("/")
      }
      else{
        toast.error(response.data.message)
      }
      
    }
    
  } catch (error) {
    toast.error(error.response.data.message) 
  }
}
useEffect(()=>{
  if (token) {
    navigate("/")
  }

},[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
        <p className='.prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
    {currentState === "Login" ? "" : <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}  
      <input type="email" className='w-full px-3 py-2 border border-gray-800' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' required />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your passowrd?</p>
        {currentState === "Login" ? <p onClick={()=>setCurrentState("Sign Up")} className='cursor-pointer hover:text-red-400'>Create a account</p> : <p onClick={()=>setCurrentState("Login")} className='cursor-pointer hover:text-red-400'>Login here</p> }

      </div>
      <button className='bg-black text-white font-light  px-8 py-2 rounded'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>

    </form>
  )
}

export default Login