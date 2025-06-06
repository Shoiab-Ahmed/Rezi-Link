import React from 'react'
import { useEffect } from 'react'
import UserNav from './components/UserNav'
import Carousel from './components/Carousel'
import axios from 'axios'
import Card from './components/Card'
import NavScrollExample from './components/Navbar2'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react'
import Footer from './components/Footer'

import { useAuth } from './AuthContext'








const Dashboard = () => {
  const {isAuthenticated} = useAuth()
  
     
    
      
  return (
    <>
    {isAuthenticated ?<div className='bg-[#FAFAFA] ' >
    <div className=' w-full mx-auto '>
      <NavScrollExample />
      <div className='w-[95%] mx-auto'>
      <Carousel/>
      </div>
      


      <div className='mt-7.5 w-[95%] mx-auto'>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Bangalore Properties</h1>
        <Card city= "Bangalore"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Delhi Properties</h1>
        <Card city= "Delhi"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Hyderabad Properties</h1>
        <Card city= "Hyderabad"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Mumbai Properties</h1>
        <Card city= "Mumbai"/>


      </div>
      <Footer  />


     
        
    
    </div>
    </div>: <div className='flex justify-center items-center h-screen'>YOU SHOULD BE LOGGED IN TO SEE THIS PAGE </div>
    }
    
    </>
  )
}

export default Dashboard
