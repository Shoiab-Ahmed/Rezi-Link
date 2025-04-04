import React from 'react'
import { useEffect } from 'react'
import UserNav from './components/UserNav'
import Carousel from './components/Carousel'
import axios from 'axios'
import Card from './components/Card'




const Dashboard = () => {
  
     
    
      
  return (
    <div className=' w-[95%] mx-auto'>
      <UserNav />
      <Carousel/>
      <Card/>
        
    
    </div>
  )
}

export default Dashboard
