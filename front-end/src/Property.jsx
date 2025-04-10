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
  const maps = mainItem.map((item) => item.location.maps)


  console.log(mainItem)
  return (
    <div>


      <UserNav />
      {mainItem.map((item) => {
        return (
          <div key={item._id} className='flex flex-col w-[95%] mx-auto mt-[30px] gap-[30px] '>
            <div className='flex h-full gap-[20px]'>
            <div className='w-[60%] flex flex-col gap-[20px] '>
                <img src={item.images[0]?item.images[0]:picture} className='w-full h-[400px] rounded-[9px] object-cover' />
                <div className='flex gap-[20px] '>
                  {item.images.map((img,i)=>{
                    return (
                      <img src={img} className='w-[200px] h-[150px] rounded-[9px]' />
                    )
                  })}
                 
                  

                </div>
              </div>

              <div className=' w-[40%]'>
                <iframe src={maps} width="400" height="300" className='border-0' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

              </div>

            </div>

            <div className='flex flex-col gap-[20px]'>
              <p className='poppins-semibold text-[28px] text-gray-600 '>{item.price}<span>$</span></p>
              <h1 className='poppins-semibold text-[32px] capitalize'>{item.title}({item.area_sqft} sqft)</h1>
              <p className='poppins-regular text-[20px] w-[60%] text-gray-600'>{item.description}</p>
              
              

              
            </div>
            <div className='flex flex-row gap-[10px] w-full items-center'>
              <h1 ><FaLocationDot className='text-[22px]' />

              </h1>
              <p className='poppins-regular text-[22px] tracking-[1px]'>{item.location.address},{item.location.city},{item.location.state},{item.location.zip_code}</p>
            </div>
            <div className='flex flex-row gap-[200px] w-full items-center'>
            <div className='flex flex-row row gap-[10px] items-center' >
              <h1 ><GrHomeRounded  className='text-[20px]'/>              </h1>


              <p className='poppins-regular text-[20px]'>{item.property_type}</p>
              </div>
              <div className='flex flex-row  gap-[10px] items-center'>
              <p><IoMdResize className='text-[22px]' />              </p>
              <p className='poppins-regular text-[20px]'>{item.area_sqft} sqrt</p>
              </div>



            
            </div>

            <div>
              <h1 className='poppins-bold  text-[22px]'>Furnishings</h1>
              <div className='flex flex-row items-center w-[60%] justify-between mt-5'>
                <div className='flex flex-row gap-[20px] items-center'>
                <IoBedOutline className='text-[26px]' />              
                <div>
                  <h1 className='poppins-semibold text-[20px]'>Bed Room</h1>
                  <p className='poppins-regular text-[14px]'> {item.furnishings.bedroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
                  </div>              
                </div>
                <div className='flex flex-row gap-[20px] items-center'>
                <MdOutlineMeetingRoom  className='text-[26px]' />              
                <div>
                  <h1 className='poppins-semibold text-[20px]'>Hall</h1>
                  <p className='poppins-regular text-[14px]'> {item.furnishings.hall?.map((Bed)=>{return <span> {Bed} </span> })}</p>
                  </div>              
                </div>
                <div className='flex flex-row gap-[20px] items-center'>
                <FaBath className='text-[26px]' />              
                <div>
                  <h1 className='poppins-semibold text-[20px]'>Bath Room</h1>
                  <p className='poppins-regular text-[14px]'> {item.furnishings.bathroom?.map((Bed)=>{return <span> {Bed} </span>  })}</p>
                  </div>              
                </div>                <div className='flex flex-row gap-[20px] items-center'>
                <FaKitchenSet  className='text-[26px]'/>              
                <div>
                  <h1 className='poppins-semibold text-[20px]'>Kitchen</h1>
                  <p className='poppins-regular text-[14px]'> {item.furnishings.kitchen?.map((Bed)=>{return <span> {Bed} </span> })}</p>
                  </div>              
                </div>
              </div>
              {/* <p className='poppins-regular text-[20px]'>Bed Rooms - {item.furnishings.bedroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Hall - {item.furnishings.hall?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Bath Room - {item.furnishings.bathroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              <p className='poppins-regular text-[20px]'>Kitchen - {item.furnishings.kitchen?.map((Bed)=>{return <span> {Bed} </span> })}</p>
              */}
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

         <input type="text" name="" id="" placeholder='Name' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'  />
         <input type="email" name="" id="" placeholder='Email' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'/>
         <input type="text" name="" id="" placeholder='Phone number' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]'/>
         <input type="submit" name="" id="" value="Send" className=' text-white bg-[#714FAE] cursor-pointer hover:bg-[#714FAE]/90 px-[20px] py-[13px] rounded-[8px] poppins-semibold text-[16px]'/>

          </form>

        </div>

        <div className='overflow-hidden bg-cover shadow-2xl  '>
          <img className='w-[488px] h-[595px] object-cover' src={item.images[0]} alt="" />
        </div>
      </div>

            
          </div>
        )
      })}
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
  )
}

export default Property