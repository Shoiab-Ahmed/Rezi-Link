import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';

const Card2 = () => {
  const [allProperties, setAllProperties] = useState([])
  useEffect(() => {




    const fetchdata = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/my-properties',{
          headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })


        setAllProperties(response.data)
      }
      catch (error) {
        console.log("Error while fetching the data", error)
      }


    }
    fetchdata()



  }, [])
  


  return (
    <div>
    {allProperties.map((item, index) => {
      <div className="relative flex justify-center items-center min-h-[300px]  ">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 flex w-[700px] relative z-0">
        {/* Right Side Content */}
        <div className="ml-[150px] w-full relative">
          {/* Date */}
          <p className="text-sm text-gray-500 mb-1"></p>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 mb-4">
            {item.description}
            
          </p>

          {/* Button */}
          <button className="px-6 py-2 bg-[#9393ff] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition cursor-p
          ">
            More Info
          </button>

          {/* Carousel Dots */}
          
        </div>
      </div>

      {/* Left Image Card - on top of white card */}
      <div className="absolute -left-10  top-1/2 -translate-y-1/2  z-10">
        <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-lg relative">
          {/* Background Image */}
          <img
            src="https://via.placeholder.com/200x200" // replace with your image
            
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute bg-[#9393ff] inset-0 top-0  ">
            <img src="https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg"/>
          </div>
        </div>
      </div>
    </div>
    })}
    </div>

  );
};

export default Card2;
