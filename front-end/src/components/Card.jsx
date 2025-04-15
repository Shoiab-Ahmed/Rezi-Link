import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";



const Card = ({ city }) => {

  const navigate = useNavigate()
  const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")
  const [data, setData] = useState([])





  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties/grouped-by-city');

        if (city === "Bangalore") {
          setData(response.data.Bangalore);
        } else if (city === "Mumbai") {
          setData(response.data.Mumbai);
        } else if (city === "Delhi") {
          setData(response.data.Delhi);
        } else if (city === "Hyderabad") {
          setData(response.data.Hyderabad);
        }
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchdata();
  }, [city]); // run this effect only when `city` changes



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




  return (
    <div className=' flex flex-wrap justify-between  gap-[30px]'>
      {data.slice(0, 3).map((item, index) => {
        return (
          <div key={index} className='bg-[#F4F4FF] hover:bg-[#e8e8ff] text-black transform hover:-translate-y-4 transition-all w-[30%] rounded-[20px] flex flex-col justify-between gap-[20px] p-[20px]'>
            <img src={item.images[0] ? item.images[0] : picture} alt="" className='h-[400px]  max-h-[200px] w-full object-cover rounded-xl' />
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
              }} className='text-[16px] w-[150px] h-[40px] mt-[5px] bg-[#9393ff] hover:bg-[#8686ff] text-white rounded-[10px] poppins-normal cursor-pointer'>Get More Info</button>
            </div>


          </div>
        )
      })}





    </div>
  )
}

export default Card