import React from 'react'
import Navbar2 from './components/Navbar2'
import Carousel from './components/Carousel'
import Card2 from './components/Card2'

const Seller = () => {
  
  return (
    <div >
      <Navbar2 />

      <div className='w-[95%] mx-auto'>
        <Carousel />
      </div>
      <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'> 
      <Card2 />
      <div className='w-[95%] mx-auto '>

        </div>
      </div>


    </div>
  )
}

export default Seller



