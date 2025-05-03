import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import NavScrollExample from './Navbar2';
import Footer from './Footer';
import { useAuth } from '../AuthContext'

import { FaRupeeSign } from "react-icons/fa";

const Hyderabad = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")
  const [data, setData] = useState([])






  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:5000/properties/grouped-by-city')
      console.log(response.data.Hyderabad)
      setData(response.data.Hyderabad)





    }
    catch (error) {
      console.log("Error while fetching the data", error)
    }


  }
  fetchdata()


  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(1) + ' Cr';
    } else if (price >= 100000) {
      return (price / 100000).toFixed(1) + ' L';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1) + ' K';
    }
    return price;
  };



  console.log(data)

  return (
    <>
      {isAuthenticated ? <div>
        <NavScrollExample />
        <h1 className="text-[40px] poppins-bold w-full text-center my-[30px] bg-gradient-to-r from-[#B721FF] to-[#21D4FD] bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-[#21D4FD] hover:to-[#B721FF] transition duration-300">
          Hyderabad Properties
        </h1>


        <div className=' flex flex-wrap justify-between  gap-[30px]'>
          {data.map((item, index) => {
            return (
              <div key={index} className='bg-[#F4F4FF] hover:bg-[#e8e8ff] text-black transform hover:-translate-y-4 transition-all w-[30%] rounded-[20px] flex flex-col justify-between gap-[20px] p-[20px]'>
                <img src={item.images[0] ? item.images[0] : picture} alt="" className='h-[400px]  max-h-[200px] w-full object-cover rounded-t-[10px]' />
                <div>
                  <p className='poppins-bold text-[25px] overflow-ellipsis overflow-hidden whitespace-nowrap'>{item.title} </p>
                  <p className='poppins-medium text-gray-700 text-[14px] overflow-ellipsis whitespace-nowrap overflow-hidden'>{item.description}</p>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-5  ">
                  {item.tags.map((word, index) => (
                    <span
                      key={index}
                      className=" px-3 py-1 rounded-[5px] text-[12px] bg-[#dcdcfc] "
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <div className='flex justify-between items-center'>
                  <p className='poppins-semibold text-[20px] flex items-center'><FaRupeeSign />{formatPrice(item.price)}</p>
                  <button onClick={() => {
                    navigate(`/property/${item._id}`)
                  }} className='text-[16px] w-[150px] h-[40px] mt-[5px] bg-[#9393ff] text-white rounded-[10px] poppins-normal cursor-pointer'>Get More Info</button>
                </div>


              </div>
            )
          })}





        </div>
        <Footer />

      </div> : <div className='flex justify-center items-center h-screen' >Should be logged in</div>}




    </>
  )
}

export default Hyderabad
