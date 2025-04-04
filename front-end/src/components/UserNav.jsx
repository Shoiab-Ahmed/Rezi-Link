import React from 'react'
import user from '../assets/user.png'

const UserNav = () => {
  return (
    <div>
        <nav className="w-[95%] h-[70px] mx-auto mt-[20px] bg-[#D5D5D5]/80 flex justify-between items-center rounded-[20px] p-[20px]">
            <h1 className="text-[24px] poppins-bold">REZI-LINK</h1>
            <div className=' bg-black h-[40px] mt-[5px] rounded-[20px] ' >
                <ul className='flex justify-between items-center text-white h-full px-4 gap-4  poppins-normal'>
                    <li>Buy</li>
                    <li>Sell</li>
                    <li>About Us</li>
                    <li><input type="search" className='bg-[#D5D5D5] rounded-[5px] text-black outline-none border-none px-[4px]' placeholder='Search Here ' /></li>
                </ul>

            </div>
            <div className='flex justify-between gap-4'>
                <img src={user} alt="user" className='w-[50px] h-[50px] rounded-full' />
            
            
            <button className='w-[100px] h-[40px] mt-[5px] bg-black text-white rounded-[10px] poppins-normal cursor-pointer'>Logout</button>

            </div>

        </nav>

      
    </div>
  )
}

export default UserNav
