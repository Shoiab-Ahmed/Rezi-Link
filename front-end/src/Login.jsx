import React from "react";
import Fsmall from "./assets/Fsmall.png"
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h1 className="text-2xl font-bold mb-2">REZI-LINK</h1>
        <h2 className="text-xl font-semibold mb-4">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Enter your email and password to access your account</p>

        <div className="flex space-x-4 mb-4">
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700">
            <img src="gogglelogo" alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="w-5 h-5 mr-2flex items-center px-4 py-2 border rounded-lg text-gray-700">
           
            <FcGoogle />
          </button>
        </div>

        <p className="text-gray-400 mb-4">Or continue with email</p>

        <div className="w-full max-w-sm">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none" />
          <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none" />

          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md">Sign In</button>
        </div>

        <p className="text-gray-500 mt-4">
          Don't have an account? <a href="#" className="text-blue-500">Signup</a>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2">
        <img src="banner" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
