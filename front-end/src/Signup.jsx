import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import banner from './assets/banner.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post("http://127.0.0.1:5000/users/register",{
        username, email, password
      })
      
      navigate('/dashboard')
    }  
    catch(e) {
      console.log("Cannot sign up",e)
    }
  }
  return (
    <div className='flex flex-col lg:flex-row w-full h-screen'>
      {/* Left Div */}
      <div className="lg:w-[40%] w-full flex justify-center items-center p-6 lg:p-12">
        <div className='w-full max-w-md'>
          <div className='flex justify-center items-center mb-6'>
            <h1 className='text-2xl lg:text-3xl poppins-medium'>REZI-LINK</h1>
          </div>

          <div className='text-center mb-6 '>
            <h1 className='text-3xl lg:text-4xl poppins-normal'>Get Started</h1>
            <p className='text-sm lg:text-base poppins-normal '>Get started with your email and password</p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <button className='flex items-center justify-center w-full sm:w-1/2 border border-gray-300 rounded-lg py-3 gap-2 poppins-medium cursor-pointer text-[20px]'>
              <FcGoogle className='text-[30px]' /> Google
            </button>
            <button className='flex items-center justify-center w-full sm:w-1/2 border border-gray-300 rounded-lg py-3 gap-2 poppins-medium cursor-pointer text-[20px]'>
              <FaGithub className='text-[30px] text-black' /> GitHub
            </button>
          </div>

          <p className='text-center text-gray-500 mb-4 poppins-normal'>Or continue with email</p>
          <form onSubmit={handleSignup} >

          <div className='mb-4'>
            <label className="block text-sm poppins-medium mb-1">Username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg poppins-normal" placeholder="Enter your username" />
          </div>

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
            <a href="#" className="text-sm poppins-medium">Forgot Password?</a>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg poppins-bold cursor-pointer">Sign Up</button>
          </form>

          <div className='mt-6 text-center text-gray-600'>
            <p className='poppins-normal'>Already have an account? <a href='/login'><span className='text-black poppins-normal cursor-pointer underline'>Login</span></a></p>
          </div>
        </div>
      </div>

      {/* Right Div */}
      <div className="lg:w-[60%] ">
        <img src={banner} alt="banner" className='w-full h-full object-cover' />
      </div>
    </div>
  );
};

export default Signup;