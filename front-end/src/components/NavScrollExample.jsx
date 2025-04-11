import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { MdArrowDropDownCircle } from "react-icons/md";


function NavScrollExample() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="bg-[#e8e8ff] text-black  rounded-lg  shadow-md w-full">
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-4">

      {/* LEFT: Logo + Links */}
      <div className="flex items-center space-x-6">
        {/* Brand */}
        <a href="#" className="text-2xl poppins-semibold text-[24px] ">
          REZI-<span className=' text-[#9393ff]'>LINK</span> 
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 ">
          <a href="/dashboard" className="text-[18px] poppins-regular hover:text-[#9393ff] transform hover:-translate-y-1 transition-all hover:text-[20px]">
            Home
          </a>
          <a href="#action2" className="text-[18px] poppins-regular hover:text-[#9393ff] transform hover:-translate-y-1 transition-all hover:text-[20px]">
            Become Seller
          </a>

          {/* Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2  rounded-md px-3 py-2 text-[18px] poppins-regular">
              Select City
              <MdArrowDropDownCircle />
            </button>

            <div className="absolute hidden group-hover:block bg-white text-black border rounded shadow-md z-10 mt-1 w-40">
              <a href="/bangalore" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">BANGALORE</a>
              <a href="/hyderabad" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">HYDERABAD</a>
              <a href="/mumbai" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">MUMBAI</a>
              <a href="/delhi" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">DELHI</a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="search"
          placeholder="Search"
          className="px-3 py-2.5 text-[16px] poppins-regular border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          
          className="px-4 py-2.5 text-[16px] poppins-regular rounded-lg bg-[#9393ff] text-white hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 md:hidden focus:outline-none ml-2 "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden flex flex-col space-y-4 mt-4">
        <a href="#action1" className="text-[18px] poppins-semibold">Home</a>
        <a href="#action2" className="text-[18px] poppins-semibold">Become Seller</a>
        <a href="/bangalore" className="text-[18px] poppins-semibold">BANGALORE</a>
        <a href="/hyderabad" className="text-[18px] poppins-semibold">HYDERABAD</a>
        <a href="/mumbai" className="text-[18px] poppins-semibold">MUMBAI</a>
        <a href="/delhi" className="text-[18px] poppins-semibold">DELHI</a>
      </div>
    )}
  </div>
</nav>

  );
}

export default NavScrollExample;
