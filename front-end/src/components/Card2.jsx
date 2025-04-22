import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Card2 = () => {
  const navigate = useNavigate()
  const [allProperties, setAllProperties] = useState([])
    const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg");
  
  useEffect(() => {




    const fetchdata = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/my-properties', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })


        setAllProperties(response.data)
      }
      catch (error) {
        console.log("Error while fetching the data", error)
      }


    }
    fetchdata()

    console.log(allProperties)

  }, [])



  return (
    <div className="w-[95%] mx-auto mt-8">
     <h1 className='poppins-bold text-[32px] text-start my-7'>YOUR ADDED PROPERTIES</h1>
      {allProperties.length > 0 ? (
        
        <div className="flex flex-wrap gap-6 justify-between">
           
          {allProperties.map((item, index) => (
            <div key={index} className="w-full md:w-[48%] lg:w-[45%] relative flex justify-start flex-row items-center min-h-[200px]">
              {/* Main Card */}
              <div className="bg-[#F4F4FF] rounded-3xl shadow-2xl px-10 py-8 flex w-full relative z-0">
                <div className="ml-[150px] w-full relative">
                  <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-600 mt-2 mb-4">{item.description}</p>
                  <button onClick={() => navigate(`/property/${item._id}`)} className="px-6 py-2 bg-[#9393ff] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition cursor-pointer">
                    More Info
                  </button>
                </div>
              </div>
  
              {/* Left Image */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-10">
                <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-xl shadow-[#9393ff] relative">
                  <img
                    src={item.images?.[0] || picture}
                    className="object-cover h-full w-full "
                    alt="property"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-40 flex justify-center items-center flex-col">
          <h1 className="text-lg font-semibold text-gray-700 mb-4">You have not added any properties yet.</h1>
          <button
            onClick={() => navigate('/add-properties')}
            className="w-fit px-4 py-2 flex items-center justify-center gap-2 rounded-md bg-[#9393ff] text-white text-sm font-medium"
          >
            <FaPlus className="w-[14px] h-[14px]" />
            Add Property
          </button>
        </div>
      )}
  
    </div>
  );
  
};

export default Card2;
