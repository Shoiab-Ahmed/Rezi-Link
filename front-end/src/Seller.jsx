import React from 'react'
import Navbar2 from './components/Navbar2'
import Carousel from './components/Carousel'
import Card2 from './components/Card2'
import Footer from './components/Footer'

const Seller = () => {

  return (
    <div >
      <Navbar2 />

      <div className='w-[95%] mx-auto'>
        <Carousel />
        
          <Card2 />

       

      </div>
      <Footer/>




    </div>
  )
}

export default Seller



