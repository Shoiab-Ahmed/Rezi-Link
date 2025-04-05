import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Card = () => {
    const [picture, setPicture] = useState("https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg")
    const [data, setData] = useState([])
    useEffect(() => {



        const fetchdata = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/properties')

                
                setData(response.data)
            }
            catch (error) {
                console.log("Error while fetching the data", error)
            }


        }
        fetchdata()

        


    }, [])
    console.log(data)
    return (
        <div className=' flex flex-wrap justify-between mt-[30px] gap-[30px]'>
            {data.map((item, index) => {
                return (
                    <div key={index}  className='bg-[#f5f3f3] w-[30%] rounded-[20px] flex flex-col justify-between gap-[30px] p-[20px]'>
                        <img src={picture} alt="" className='h-[400px]  max-h-[200px] w-full object-cover rounded-t-[10px]'/>
                        <p className='poppins-bold text-[25px]'>{item.title} </p>
                        <p className='poppins-medium text-gray-700 text-[16px]'>{item.description}</p>
                        <div className='flex justify-between items-center'>
                        <p className='poppins-bold text-[16px]'>{item.price}<span>Rs</span></p>
                        <button className='text-[16px] w-[150px] h-[40px] mt-[5px] bg-black text-white rounded-[10px] poppins-normal cursor-pointer'>Get More Info</button>
                        </div>

                       
                    </div>
                )
            })}
 




        </div>
    )
}

export default Card