import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () =>  {
  return (
    <div>
        <div className='w-full px-[5%] py-[5%] mx-auto flex gap-[10px] mt-[40px] justify-between items-center bg-black text-white'>
                <div className='h-full gap-[50px] flex justify-between flex-col '>
                  <h1 className='text-[39px] poppins-medium  '>REZI_LINK</h1>
                  <p className=' text-white poppins-normal text-[18px]'>Find your perfect space or trusted service provider <br></br> with REZI-LINK.
                  Simplifying real estate, one click at a time</p>
                  <div className='flex gap-[30px] items-center '><FaFacebook className=' text-[40px]' /> <FaInstagram className='text-[40px]'/> <FaLinkedin className=' text-[40px]'/>
        
        
        
                  </div>
                  
                </div>
                
                <div className='grid grid-cols-3 gap-[90px] h-full'>
                  <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                    <h2 className=' font-bold text-[18px] '>About</h2>
                    <p className='text-white'>About US</p>
                    <p className='text-white '>Features</p>
                    <p className='text-white'>Blog</p>
                    <p className='text-white'>Pricing</p>
                    </div>
                  <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                    <h2 className='font-bold text-[18px]'>Company</h2>
                    <p className='text-white'>How We Work </p>
                    <p className='text-white'>Press Room</p>
                    <p className='text-white'>Jobs</p>
                    <p className='text-white'>Community</p>
                    </div>
                  <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
                    <h2 className=' font-bold text-[18px]'>Legal</h2>
                    <p className='text-white'>Terms of Use</p>
                    <p className='text-white'>Privacy Policy</p>
                    <p className='text-white'>Security Policy</p>
                    <p className='text-white'>Cookie Setings</p>
                    </div>
        
        
                </div>
              
              
        
        
        
              </div>
              <div className='w-full border-t-[1px] border-[#272727B2] p-[24px]'>
                <p className='text-center poppins-medium'>© Copyright 2022 Rezi-Link. All rights reserved.</p>
              </div>
      
    </div>
  )
}

export default Footer
