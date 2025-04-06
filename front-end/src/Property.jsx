import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserNav from './components/UserNav'
import al from './assets/al.png'

const Property = () => {
  const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")

  const [allProperties, setAllProperties] = useState([])
  const [property, setProperty] = useState([])

  const params = useParams()

  useEffect(() => {




    const fetchdata = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/properties')


        setAllProperties(response.data)
      }
      catch (error) {
        console.log("Error while fetching the data", error)
      }


    }
    fetchdata()



  }, [])

  const mainItem = allProperties.filter((item) => item._id === params.id);


  console.log(mainItem)
  return (
    <div>


      <UserNav />
      {mainItem.map((item) => {
        return (
          <div key={item._id} className='flex flex-col w-[95%] mx-auto mt-[30px] gap-[30px] '>
            <div className='flex h-full gap-[20px]'>
              <div className='w-[60%] flex flex-col gap-[20px] '>
              <img src={picture} className='w-full h-[400px] rounded-[9px] object-cover'   />
              <div className='flex gap-[20px] '>
            <img src={picture} className='w-[200px] h-[150px] rounded-[9px]'   />
            <img src={picture} className='w-[200px] h-[150px] rounded-[9px]'   />
              
            </div>
              </div>

              <div className=' w-[40%]'>
                <img src={al} className='h-full w-full object-cover rounded-[9px]' />

              </div>
            </div>

            <div >
              <p className='poppins-bold text-[28px]'>{item.price}<span>$</span></p>
              <h1 className='poppins-bold text-[32px]'>{item.title}({item.area_sqft} sqft)</h1>
              <p className='poppins-regular text-[20px] w-[60%] text-gray-600'>{item.description}</p>
              
              

              
            </div>
            <div>
              <h1 className='poppins-regular text-gray-600 text-[18px]'>Address</h1>
              <p className='poppins-regular text-[20px]'>{item.location.address},{item.location.city},{item.location.state},{item.location.zip_code}</p>
            </div>
            <div>
              <h1 className='poppins-regular text-gray-600 text-[18px]'>Property Type</h1>
              <p className='poppins-regular text-[20px]'>{item.property_type}</p>
            </div>
            <div>
              <h1 className='poppins-regular text-gray-600 text-[18px]'>Furnishings</h1>
              <p className='poppins-regular text-[20px]'>Bed Rooms - {item.furnishings.bedroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Hall - {item.furnishings.hall?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Bath Room - {item.furnishings.bathroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Kitchen - {item.furnishings.kitchen?.map((Bed)=>{return <span> {Bed} </span> })}</p>
             
            </div>
            
          </div>
        )
      })}





    </div>
  )
}

export default Property