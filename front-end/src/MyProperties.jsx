import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar2 from './components/Navbar2'
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const MyProperties = () => {
  const location = useLocation();
  const [allProperties, setAllProperties] = useState([])




  const  handleDeleteProperty = async (property_id)=>{
     try {
      const response = await axios.delete(`http://127.0.0.1:5000/properties/${property_id}`,{
        headers:{
           Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })

      
     }
     catch(e){
      console.log(e)
     }
  }



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
      <div className='bg-[#F5F6FA]   w-full flex flex-col  '>

        <Navbar2 />
        {/*  */}
        <div className='flex w-full flex-col'>
          <div className='p-[30px]'>
            <div className=''>
            <div>
  <div>
  <ul className="flex gap-[20px] border-b border-gray-200">
      <li className="px-5 py-4 rounded-lg">
        <NavLink
          to="/all-properties"
          className={`text-[20px] poppins-semibold pb-2 transition-all duration-300 ease-in-out border-b-4 ${
            location.pathname === '/all-properties'
              ? 'text-[#4F46E5] border-[#4F46E5]'
              : 'text-gray-400 border-transparent'
          }`}
        >
          All Properties
        </NavLink>
      </li>
      <li className="px-5 py-4 rounded-lg">
        <NavLink
          to="/my-properties"
          className={`text-[20px] poppins-semibold pb-2 transition-all duration-300 ease-in-out border-b-4 ${
            location.pathname === '/my-properties'
              ? 'text-[#4F46E5] border-[#4F46E5]'
              : 'text-gray-400 border-transparent'
          }`}
        >
          My Properties
        </NavLink>
      </li>
    </ul>
  </div>
</div>


              <div className='  w-full p-[24px] flex justify-between'>
                <h1 className='nunito-sans font-semibold text-[24px]'>Total Policies</h1>
                <button className="w-[118px] h-[28px] flex items-center justify-center gap-[15px] rounded-[4px] bg-[#714FAE] text-white text-[12px] poppins-regular cursor-pointer">
                  New Policy <FaPlus className="w-[12px] h-[12px]" />
                </button>

              </div>
              <table className="w-full rounded-[12px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="poppins-semibold text-[20px] text-left p-3">Image</th>
                    <th className="poppins-semibold text-[20px] text-left p-3">Property Name</th>
                    <th className="poppins-semibold text-[20px] text-left p-3">Owner Name</th>
                    <th className="poppins-semibold text-[20px] text-left p-3">Property Type</th>
                    <th className="poppins-semibold text-[20px] text-left p-3">City</th>
                    <th className="poppins-semibold text-[20px] text-left p-3">Opertaions</th>
                  </tr>
                </thead>
                <tbody className=' ' >
                  {allProperties.map((property,ind) => {
                    return (
                      <tr key={ind} className='bg-white '>
                        <td className="p-3 flex items-center gap-2">
                          <div className="w-[80px] h-[80px] rounded-lg overflow-hidden">
                            <img
                              src={property.images[0]}
                              alt="Property"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        <td className="p-3  poppins-regular text-[18px]">{property.title}</td>
                        <td className="p-3  poppins-regular text-[18px]">{property.contacts[0].name}</td>
                        <td className='poppins-regular text-[18px]'>{property.property_type}</td>
                        <td className="p-3 poppins-regular text-[18px]">{property.location.city}</td>
                        <td className="p-3 ">
                          <div className="flex gap-[15px]  items-center">
                           <button className='bg-[#9393ff] text-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer' > <MdOutlineModeEdit className="w-[20px] h-[20px]" /></button>
                            <button  className='bg-[#9393ff] text-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer' onClick={()=>handleDeleteProperty(property._id)}><RiDeleteBinLine className="w-[20px] h-[20px]" /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}




                </tbody>
              </table>



            </div>




          </div>

        </div>


      </div>
    </div>
  )
}

export default MyProperties