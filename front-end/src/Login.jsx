import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import banner2 from  './assets/banner2.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post("http://127.0.0.1:5000/users/login",{
        email, password
      })
      localStorage.setItem("token",response.data.token)
      navigate('/dashboard')
    }  
    catch(e) {
      console.log("Cannot Login",e)
    }
  }
  
  return (
    <div>
          <div className='flex flex-col lg:flex-row w-full h-screen'>
            {/* Left Div */}
            <div className="lg:w-[40%] w-full flex justify-center items-center p-6 lg:p-12">
              <div className='w-full max-w-md'>
                <div className='flex justify-center items-center mb-6'>
                  <h1 className='text-2xl lg:text-3xl poppins-medium'>REZI-LINK</h1>
                </div>
      
                <div className='text-center mb-6'>
                  <h1 className='text-3xl lg:text-4xl poppins-normal'>Welcome Back</h1>
                  <p className='text-sm lg:text-base poppins-normal'>Enter your email and password to access your account</p>
                </div>
      
                <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                  <button className='flex items-center justify-center w-full sm:w-1/2 border border-gray-300 rounded-lg py-3 gap-2 poppins-medium'>
                    <FcGoogle /> Google
                  </button>
                  <button className='flex items-center justify-center w-full sm:w-1/2 border border-gray-300 rounded-lg py-3 gap-2 poppins-medium'>
                    <FaFacebook className='text-blue-600' /> Facebook
                  </button>
                </div>
      
                <p className='text-center text-gray-500 mb-4 poppins-normal'>Or continue with email</p>


                <form onSubmit={handleLogin}>
      
                
      
                <div className='mb-4'>
                  <label className="block text-sm poppins-medium mb-1">Email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg poppins-normal" placeholder="Enter your email" />
                </div>
      
                <div className='mb-4'>
                  <label className="block text-sm poppins-medium mb-1">Password</label>
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg poppins-normal" placeholder="Enter your password" />
                </div>
      
                <div className="flex justify-between items-center mb-4">
                  <label className="flex items-center text-sm poppins-medium">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <a href="#" className="text-sm poppins-medium ">Forgot Password?</a>
                </div>
      
                <button className="w-full bg-black text-white py-3 rounded-lg poppins-bold cursor-pointer">Login</button>
                </form>
      
                <div className='mt-6 text-center text-gray-600'>
                  <p className='poppins-normal'>Already have an account? <span className='text-black poppins-normal cursor-pointer'>Login</span></p>
                </div>
              </div>
            </div>
      
            {/* Right Div */}
            <div className="lg:w-[60%] ">
              <img src={banner2} alt="banner2" className='w-full h-full object-cover' />
            </div>
          </div>
      
      

    </div>
  )
}

export default login
