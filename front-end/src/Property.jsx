import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserNav from './components/UserNav'

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
      




    </div>
  )
}

export default Property