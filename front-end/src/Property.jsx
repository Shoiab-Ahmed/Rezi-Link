import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserNav from './components/UserNav'
import al from './assets/al.png'
import { FaLocationDot } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdResize } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Footer from './components/Footer'

import { Link } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";



import user from './assets/user.png'
import NavScrollExample from './components/NavScrollExample'








const Property = () => {
  const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")

  const [hasPurchased, setHasPurchased] = useState(false);


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
  const maps = mainItem.map((item) => item.location.maps)

  const suggestions = allProperties.filter((item) =>
    item.location.city === mainItem[0]?.location.city && item._id !== mainItem[0]?._id
  );
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



  console.log(mainItem)
  return (
    <div>


      <NavScrollExample />
      {mainItem.map((item) => {
        return (
          <div key={item._id} className='flex flex-col w-[95%] mx-auto mt-[30px] gap-[30px] '>
            <div className='flex h-full gap-[20px]'>
              <div className='w-[60%] flex flex-col gap-[20px] '>
                <img src={picture} className='w-full h-[400px] rounded-[9px] object-cover' />
                <div className='flex gap-[20px] '>
                  {item.images.map((img, i) => {
                    return (
                      <button onClick={() => setPicture(img)} key={i} className='cursor-pointer'>
                            <img src={img} className='w-[200px] h-[150px] rounded-[9px]' />
                      </button>

                    )
                  })}



                </div>
              </div>

              <div className=' w-[40%]'>
                <iframe src={maps} width="400" height="300" className='border-0 w-full h-full rounded-xl' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

              </div>

            </div>

            {/* below divs */}
            <div  className='flex justify-between '>
              <div className='w-[60%] flex flex-col gap-[20px]'>
                <div className='flex flex-col gap-[15px]'>
                  <p className='poppins-semibold text-[28px] text-gray-600 flex items-center '><FaRupeeSign /> <span>{formatPrice(item.price)}</span>            </p>
                  <h1 className='poppins-semibold text-[32px] capitalize'>{item.title}({item.area_sqft} sqft)</h1>
                  <p className='poppins-regular text-[20px] text-gray-600'>{item.description}</p>




                </div>
                <div className='flex flex-row gap-[10px] w-full items-center'>
                  <h1 ><FaLocationDot className='text-[22px]' />

                  </h1>
                  <p className='poppins-regular text-[22px] tracking-[1px]'>{item.location.address},{item.location.city},{item.location.state},{item.location.zip_code}</p>
                </div>
                <div className='flex flex-row gap-[200px] w-full items-center'>
                  <div className='flex flex-row row gap-[10px] items-center' >
                    <h1 ><GrHomeRounded className='text-[20px]' />              </h1>


                    <p className='poppins-regular text-[20px]'>{item.property_type}</p>
                  </div>
                  <div className='flex flex-row  gap-[10px] items-center'>
                    <p><IoMdResize className='text-[22px]' />              </p>
                    <p className='poppins-regular text-[20px]'>{item.area_sqft} sqrt</p>
                  </div>




                </div>

                <div className='w-full mt-5 flex flex-col gap-[20px]'>
                  <h1 className='poppins-bold  text-[22px]'>Furnishings</h1>
                  <div className='flex flex-row items-center  gap-[40px] mt-5'>
                    <div className='flex flex-row gap-[20px] items-center'>
                      <IoBedOutline className='text-[26px]' />
                      <div>
                        <h1 className='poppins-semibold text-[20px]'>Bed Room</h1>
                        <p className='poppins-regular text-[14px]'> {item.furnishings.bedroom?.map((Bed) => { return <span> {Bed} </span> })}</p>
                      </div>
                    </div>
                    <div className='flex flex-row gap-[20px] items-center'>
                      <MdOutlineMeetingRoom className='text-[26px]' />
                      <div>
                        <h1 className='poppins-semibold text-[20px]'>Hall</h1>
                        <p className='poppins-regular text-[14px]'> {item.furnishings.hall?.map((Bed) => { return <span> {Bed} </span> })}</p>
                      </div>
                    </div>
                    <div className='flex flex-row gap-[20px] items-center'>
                      <FaBath className='text-[26px]' />
                      <div>
                        <h1 className='poppins-semibold text-[20px]'>Bath Room</h1>
                        <p className='poppins-regular text-[14px]'> {item.furnishings.bathroom?.map((Bed) => { return <span> {Bed} </span> })}</p>
                      </div>
                    </div>                <div className='flex flex-row gap-[20px] items-center'>
                      <FaKitchenSet className='text-[26px]' />
                      <div>
                        <h1 className='poppins-semibold text-[20px]'>Kitchen</h1>
                        <p className='poppins-regular text-[14px]'> {item.furnishings.kitchen?.map((Bed) => { return <span> {Bed} </span> })}</p>
                      </div>
                    </div>
                  </div>
                  {/* <p className='poppins-regular text-[20px]'>Bed Rooms - {item.furnishings.bedroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Hall - {item.furnishings.hall?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Bath Room - {item.furnishings.bathroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Kitchen - {item.furnishings.kitchen?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              */}



                  {/* tags */}
                  <div className="flex flex-wrap gap-5 mt-10 ">
                    {item.tags.map((word, index) => (
                      <span
                        key={index}
                        className=" px-4 py-2 rounded-[5px] text-[15px] bg-[#f5f3f3] "
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>


{/* contact pricing info */}
<div className='w-[40%] h-full relative'>
  {/* Overlay shown only when locked */}
  {!hasPurchased && (
    <div className='absolute inset-0 flex items-center justify-center z-10'>
      <div className='bg-white text-black bg-opacity-70 p-6 rounded-lg text-center relative'>
        <FaCrown className='text-yellow-400 text-3xl -rotate-45 absolute -top-5 left-[-3px] -translate-x-1/2' />

        <p className='text-lg font-medium mb-2 flex items-center gap-2 justify-center'>
          <FaLock /> Contact Info Locked
        </p>
        <Link to="/pricings" className='text-[#714FAE] underline'>Purchase a plan</Link> to unlock
      </div>
    </div>
  )}

  {/* Content with blur effect applied conditionally */}
  <div className={`relative p-6 border h-full rounded-xl shadow-md ${!hasPurchased ? 'blur-sm pointer-events-none select-none' : ''}`}>
    <h2 className='text-2xl font-semibold mb-4'>Owner / Agent Contact Details</h2>

    <div className='space-y-4'>
      {item.contacts.slice(0, 3).map((contact, index) => (
        <div key={index} className='bg-black text-white p-4 rounded-lg shadow-sm flex items-center gap-4'>
          <img 
            src={contact.profilePic || `${user}`} 
            alt={contact.name} 
            className='w-14 h-14 rounded-full object-cover ' 
          />
          <div>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Email:</strong> {contact.email}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>





            </div>
            {/* suggesstions */}

            <div >
              <h1 className="  my-[70px] text-center text-[40px] poppins-bold tracking-[2px]">Similar Properties in {mainItem[0]?.location.city}</h1>
              <div className="grid grid-cols-3 gap-[30px]">
                {suggestions.slice(0, 6).map((sugg) => (
                  <Link to={`/property/${sugg._id}`} key={sugg._id} className="shadow-md rounded-[10px] overflow-hidden bg-white hover:scale-[1.02] transition-all duration-200">
                    <img src={sugg.images[0] ? sugg.images[0] : picture} alt="property" className="h-[200px] w-full object-cover" />
                    <div className="p-4 flex flex-col gap-[8px]">
                      <h2 className="text-[20px] poppins-semibold capitalize">{sugg.title}</h2>
                      <p className="text-[16px] text-gray-500">{sugg.location.address}, {sugg.location.city}</p>
                      <p className="text-[18px] text-[#714FAE] font-semibold flex items-center"><FaRupeeSign />          {formatPrice(sugg.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>




            <h1 className='text-center text-[40px] poppins-bold tracking-[2px]'>Connect With Us</h1>
            <div className='w-[80%] h-[595px] bg-[#f5f3f3]  rounded-[22px] mx-auto flex mt-[50px] '>
              <div className='w-[545px] mx-auto py-12 flex flex-col justify-between'>
                <div className=' flex flex-col gap-5'>
                  <h1 className='text-[64px] marcellus text-[#313131]'>Let's Connect</h1>
                  <p className="text-[14px] poppins-regular text-justify ">
                    Need help with your listing, service request, or account? Just drop your details below, and our team will reach out shortly to assist you.

                  </p></div>

                <div className='text-[#313131]/40 text-center'> __ </div>
                <form action="" className=' flex flex-col gap-5 w-full'>

                  <input type="text" name="" id="" placeholder='Name' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                  <input type="email" name="" id="" placeholder='Email' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                  <input type="text" name="" id="" placeholder='Phone number' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                  <input type="submit" name="" id="" value="Send" className=' text-white bg-[#714FAE] cursor-pointer hover:bg-[#714FAE]/90 px-[20px] py-[13px] rounded-[8px] poppins-semibold text-[16px]' />

                </form>

              </div>

              <div className='overflow-hidden bg-cover shadow-2xl  '>
                <img className='w-[488px] h-[595px] object-cover' src={item.images[0]} alt="" />
              </div>
            </div>


          </div>
        )
      })}
      <Footer />






    </div>
  )
}

export default Property