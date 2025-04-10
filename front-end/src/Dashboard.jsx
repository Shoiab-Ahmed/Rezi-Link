import React from 'react'
import { useEffect } from 'react'
import UserNav from './components/UserNav'
import Carousel from './components/Carousel'
import axios from 'axios'
import Card from './components/Card'
import NavScrollExample from './components/NavScrollExample'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react'








const Dashboard = () => {
  
     
    
      
  return (
    <div className='bg-[#FAFAFA] pt-[20px]' >
    <div className=' w-[95%] mx-auto '>
      <NavScrollExample />
      <Carousel/>


      <div className='mt-7.5'>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Bangalore Properties</h1>
        <Card city= "Bangalore"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Delhi Properties</h1>
        <Card city= "Delhi"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Hyderabad Properties</h1>
        <Card city= "Hyderabad"/>
        <h1 className='mt-2 poppins-bold text-3xl p-5'>Mumbai Properties</h1>
        <Card city= "Mumbai"/>


      </div>

            <div className='w-full flex gap-[10px] justify-between  bg-black text-white px-[13%] py-[5%] mt-[50px]'>
                    <div className='flex justify-between flex-col  '>
                      <h1 className='text-[39px] poppins-medium  '>REZI_LINK</h1>
                      <p className='  poppins-normal text-[18px]'>Find your perfect space or trusted service provider <br></br> with REZI-LINK.Simplifying real estate, one click at a time.</p>
                      <div className='flex gap-[30px] items-center '><FaFacebook className=' text-[40px]' /> <FaInstagram className=' text-[40px]'/> <FaLinkedin className='text-[40px]'/>
            
            
            
                      </div>
                      
                    </div>
                    
                    <div className='grid grid-cols-3 gap-[90px] h-full'>
                      <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                        <h2 className=' font-bold text-[18px] '>About</h2>
                        <p >About US</p>
                        <p >Features</p>
                        <p >Blog</p>
                        <p >Pricing</p>
                        </div>
                      <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                        <h2 className='font-bold text-[18px]'>Company</h2>
                        <p >How We Work </p>
                        <p >Press Room</p>
                        <p >Jobs</p>
                        <p >Community</p>
                        </div>
                      <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                        <h2 className=' font-bold text-[18px]'>Legal</h2>
                        <p >Terms of Use</p>
                        <p >Privacy Policy</p>
                        <p >Security Policy</p>
                        <p >Cookie Setings</p>
                        </div>
            
            
                    </div>
                  
                  
            
            
            
                  </div>
     
        
    
    </div>
    </div>
  )
}

export default Dashboard
