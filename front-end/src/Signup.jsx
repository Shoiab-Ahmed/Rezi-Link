import React from 'react'
import banner from './assets/banner.png'

const Signup = () => {
  return (
    <div className='flex justify-between'>
       
        <div className='w-[30%]'>
          <h1>Rezi-Link</h1>
          
        </div>
        <div className='w-[70%]'>
          <img src={banner} alt="" />

        </div>
      
    </div>
  )
}

export default Signup
