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
    return (
        <div className=' flex flex-wrap justify-between'>
            {data.map((item, index) => {
                return (
                    <div key={index} >
                        <img src={picture} alt="" />
                        <p>{item.title}</p>
                    </div>
                )
            })}





        </div>
    )
}

export default Card