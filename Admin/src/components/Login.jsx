import React, { useState } from "react";
import axios from "axios"
import { BackendURL } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(BackendURL+ "/api/user/admin", {email,password})
            console.log(response);
            
            if (response.data.success) {
                setToken(response.data.token)
                toast.success(response.data.message)
            }

        } catch (error) {
       toast.error(error?.response?.data?.message );
        }

    }


  return (
    <div className="bg-gray-300 min-h-screen w-full flex items-center justify-center">
      <div className="px-8 py-6  bg-white shadow-md rounded-md max-w-md ">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="min-w-72">
            <p className="mb-2 text-sm text-gray-700 font-medium">Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-gray-300 w-full px-3 py-2 outline-none" type="email" placeholder="example@example.com" required/>
          </div>
          <div className="mb-3 min-win-72">
            <p className="mb-2 text-sm text-gray-700 font-medium">Password</p>
            <input  onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-gray-300 w-full px-3 py-2 outline-none" type="password" placeholder="password"  required/>
          </div>
          <button  className="mt-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-950 bg-black text-white w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
