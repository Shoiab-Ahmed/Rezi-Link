import React from 'react'
import Navbar from './components/Navbar'
import home from './assets/home.png'
import first from './assets/first.png'
import second from './assets/second.png'
import third from './assets/third.png'
import fourth from './assets/fourth.png'
import face from './assets/face.png'
import rectangle from './assets/rectangle.png'
import { MdArrowOutward } from "react-icons/md";
import firstimage from './assets/first image.png'
import secondimage from './assets/secondimage.png'
import thirdimage from './assets/third image.png' 
import fourthimage from './assets/fourth image.png'
import fifthimage from './assets/fifth image.png'
import sixthimage from './assets/sixth image.png'
import frame from './assets/frame.png'
import right from './assets/right.png'
import left from './assets/left.png'
import bg from './assets/bg.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'



const Home = () => {
  const navigate = useNavigate()
  return (
    <div className=' w-[90%] mx-auto '>
      <div className='flex gap-[10px]  my-[40px] justify-between w-[90%] mx-auto'>
        <div className='w-[90%] mx-auto'>
          <Navbar />
          <div className='flex flex-col gap-[40px] mt-[120px]'>
            <h1 className="text-[40px] w-[630px] h-[104px] leading-[130%] poppins-normal">Find a comfortable and  <br /> elegant place to stay </h1>
            <p className='w-[600px] h-[90px] text-[20px] text-[#272727B2] poppins-normal leading-[150%]'>Search for a comfortable place to live with your new family and your child. Increase the harmony of your family and wife to be at home</p>
            <button onClick={()=>{navigate('/signup')}} className='w-[197px] h-[66px] text-[20px] rounded-[12px] poppins-SemiBold bg-[#A0CAF5] cursor-pointer'>Get Started</button>
          </div>
          <div className='mt-[100px] flex flex-col gap-3' >
            <h1 className='text-[24px] leading-[150%] poppins-normal '>Our Partners :</h1>
            <div className='flex gap-[32px] invert-100 items-center ]'>

              <img src={first} alt="first" className='w-[76px] h-[76px]' />
              <img src={second} alt="second" className='w-[76px] h-[76px]' />
              <img src={third} alt="third" className='w-[76px] h-[76px]' />
              <img src={fourth} alt="fourth" className='w-[76px] h-[76px]' />
            </div>
          </div>

        </div>
        <div>
          <img src={home} alt="home" />
          <div className='flex flex-row gap-[20px] mt-[20px]'>
            <div className=' flex flex-col justify-between w-[305px] h-[196px] rounded-[24px] bg-[#272727] text-white px-[20px] py-[21px]'>
              <div className='flex justify-between items-center'>
                <p className='text-[18px] w-[170px] h-[27px] leading-[150%] poppins-normal'>lots of cool options</p>
                <button className='flex justify-between'>
                <div className='flex justify-center items-center w-[54px] h-[54px] hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
                </button>

              </div>

              <p className=' w-full text-[50px] leading-[150%] flex justify-between items-center poppins-normal'>375k + <span className='text-[18px] text-[#B3B3B3]'>Collection</span> </p>




            </div>
            <div className='flex flex-row gap-[20px] mt-[20px'>
              <div className=' flex flex-col justify-between w-[305px] h-[196px] rounded-[24px] bg-[#272727] text-white px-[20px] py-[21px]' >
                <div className='flex justify-between items-center'>
                  <p className='text-[18px] w-[170px] h-[27px] leading-[150%] poppins-normal '>Happy Customer</p>
                  <div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
                </div>
                <div className='flex justify-between items-center'>

                  <h1 className=' w-full text-[50px] leading-[150%] flex justify-between items-center poppins-normal'>1.5 M +</h1>
                  <img src={face} alt="face" className='w-[80px] h-[36px] ' />
                </div>

              </div>


            </div>
          </div>
        </div>








      </div>

      <div className=' w-[90%] mx-auto grid grid-cols-2 gap-[50px]  my-[140px]'>
        <div >
          <p className='text-[55px] poppins-normal'>Style the house you <br /> want for the deal</p>
        </div>
        <div className='w-[600px] h-[120px]'>
          <p className='text-[20px] text-[#272727B2] poppins-normal'>consists of several categories of homes that you want to determine your comfort with family. So home is your palace. So you can spend time with your family at home and play with children.</p>

        </div>

        <div >
          <img src={rectangle} alt="rectangle" />
        </div>
        <div className='px-[63px] py-[40px] w-[611px] h-[302px] bg-[#272727] rounded-[24px]'>
          <div className='grid grid-cols-2 gap-[30px] text-white text-[36px]'>
            <button className='flex justify-between text-[36px] poppins-normal'>Elegant <div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>
            <button className='flex justify-between poppins-normal'>Casstle<div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>
            <button className='flex justify-between poppins-normal'>Custle <div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>
            <button className='flex justify-between poppins-normal'>Modern<div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>
            <button className='flex justify-between poppins-normal'>American<div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>
            <button className='flex justify-between poppins-normal'>Culture<div className='flex justify-center items-center w-[54px] h-[54px]   hover:rounded-full hover:bg-[#A0CAF5]'><MdArrowOutward /></div>
            </button>

          </div>





        </div>
        <div>
          <img />
        </div>
      </div>

      <div className='  flex flex-col gap-[53px] justify-center items-center'>
      <h1 className='text-[55px] poppins-normal'>Choose your home now</h1>

      
      <div className='grid grid-cols-3 gap-[50px]'>
        <div style={{backgroundImage:`url(${firstimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>
        <div style={{backgroundImage:`url(${secondimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>

        <div style={{backgroundImage:`url(${thirdimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>
        
        
        <div style={{backgroundImage:`url(${fourthimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>
        <div style={{backgroundImage:`url(${fifthimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>
        <div style={{backgroundImage:`url(${sixthimage})`}} className='w-[415px] h-[454px] bg-cover bg-center rounded-[24px] text-white '>
          <p className='bg-white text-black relative m-[30px] float-end w-[127px] h-[54px] rounded-[12px] justify-center flex items-center text-[28px] poppins-normal'>$1.5m</p>
          <div className=' w-full m-[30px] relative top-[300px] '>
          <h1 className='whitespace-nowrap w-full text-[32px] poppins-medium'>Elegan stone home</h1>
          <p className=' w-full text-[24px] poppins-normal'>New York, USA</p>
          </div>


        </div>
        
        </div>
        <div className='text-center mx-auto flex justify-center items-center'>

        

        <button className='text-[20px] w-[196px] h-[66px] rounded-[12px] bg-[#A0CAF5] poppins-bold '>See More</button>
        </div>



      </div>

      
      <div style={{backgroundImage:`url(${bg})`}} className='bg-black bg-cover bg-center gap-[32px] rounded-[40px] h-[400px] w-[1400px] mx-auto my-[140px] flex flex-col justify-center items-center'>
        
        <h1 className='w-full text-center text-white text-[50px] poppins-normal  '>Choose your best home now,<br/> for the good of the family</h1>
        <div className='flex justify-center items-center '>
        <button className=' text-[20px] w-[196px] h-[66px] rounded-[12px] bg-[#A0CAF5] poppins-bold'>Get Started</button>

        </div>


      

        

        

      </div>
      <div className='w-[90%] mx-auto flex gap-[10px] my-[40px] h-[260px] justify-between items-center'>
        <div className='h-full flex justify-between flex-col '>
          <h1 className='text-[39px] poppins-medium  '>REZI_LINK</h1>
          <p className=' text-[#272727B2] poppins-normal text-[18px]'>Find your perfect space or trusted service provider <br></br> with REZI-LINK.
          Simplifying real estate, one click at a time</p>
          <div className='flex gap-[30px] items-center '><FaFacebook className=' text-[40px]' /> <FaInstagram className='text-[40px]'/> <FaLinkedin className=' text-[40px]'/>



          </div>
          
        </div>
        
        <div className='grid grid-cols-3 gap-[90px] h-full'>
          <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
            <h2 className=' font-bold text-[18px] '>About</h2>
            <p className='text-[#272727B2]'>About US</p>
            <p className='text-[#272727B2] '>Features</p>
            <p className='text-[#272727B2]'>Blog</p>
            <p className='text-[#272727B2]'>Pricing</p>
            </div>
          <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
            <h2 className='font-bold text-[18px]'>Company</h2>
            <p className='text-[#272727B2]'>How We Work </p>
            <p className='text-[#272727B2]'>Press Room</p>
            <p className='text-[#272727B2]'>Jobs</p>
            <p className='text-[#272727B2]'>Community</p>
            </div>
          <div className=' flex flex-col gap-[33px] text-[18px] poppins-normal'>
            <h2 className=' font-bold text-[18px]'>Legal</h2>
            <p className='text-[#272727B2]'>Terms of Use</p>
            <p className='text-[#272727B2]'>Privacy Policy</p>
            <p className='text-[#272727B2]'>Security Policy</p>
            <p className='text-[#272727B2]'>Cookie Setings</p>
            </div>


        </div>
      
      



      </div>
      <div className='w-full border-t-[1px] border-[#272727B2] p-[24px]'>
        <p className='text-center poppins-medium'>© Copyright 2022 Rezi-Link. All rights reserved.</p>
      </div>







    </div>
  )
}

export default Home


















