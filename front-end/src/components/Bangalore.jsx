import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Bangalore = () => {
    const navigate = useNavigate()
    const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")
    const [data, setData] = useState([])






    const fetchdata = async () => {
        try {
            const response = await axios.get('http://localhost:5000/properties/grouped-by-city')
            console.log(response.data.Bangalore)
            setData(response.data.Bangalore)





        }
        catch (error) {
            console.log("Error while fetching the data", error)
        }


    }
    fetchdata()





    console.log(data)

    return (
        <>
        <h1 className='text-[40px] poppins-bold w-full text-center mb-[30px]'>Bangalore Properties</h1>

        <div className=' flex flex-wrap justify-between  gap-[30px]'>
            {data.map((item, index) => {
                return (

                    <div key={index} className='bg-[#f5f3f3] w-[30%] rounded-[20px] flex flex-col justify-between gap-[30px] p-[20px]'>


                        <img src={item.images[0] ? item.images[0] : picture} alt="" className='h-[400px]  max-h-[200px] w-full object-cover rounded-t-[10px]' />
                        <p className='poppins-bold text-[25px] overflow-ellipsis overflow-hidden whitespace-nowrap'>{item.title} </p>
                        <p className='poppins-medium text-gray-700 text-[16px]'>{item.description}</p>
                        <div className='flex justify-between items-center'>
                            <p className='poppins-bold text-[16px]'>{item.price}<span>Rs</span></p>
                            <button onClick={() => {
                                navigate(`/property/${item._id}`)
                            }} className='text-[16px] w-[150px] h-[40px] mt-[5px] bg-black text-white rounded-[10px] poppins-normal cursor-pointer'>Get More Info</button>
                        </div>




                    </div>
                )
            })}
            <div className='w-full flex gap-[10px] justify-between  bg-black text-white px-[13%] py-[5%] mt-[50px]'>
                <div className='flex justify-between flex-col  '>
                    <h1 className='text-[39px] poppins-medium  '>REZI_LINK</h1>
                    <p className='  poppins-normal text-[18px]'>Find your perfect space or trusted service provider <br></br> with REZI-LINK.Simplifying real estate, one click at a time.</p>
                    <div className='flex gap-[30px] items-center '><FaFacebook className=' text-[40px]' /> <FaInstagram className=' text-[40px]' /> <FaLinkedin className='text-[40px]' />



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
        </>
    )
}

export default Bangalore
