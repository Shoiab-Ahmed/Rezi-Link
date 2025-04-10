import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function NavScrollExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <a href="#" className="text-2xl poppins-bold text-[32px]">
            REZI-LINK
          </a>

          {/* Toggle button for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Nav Links */}
          <div className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-6 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
            <a href="#action1" className="text-[24px] poppins-semibold">
              Home
            </a>
            <a href="#action2" className="text-[24px] poppins-semibold">
              BECOME SELLER
            </a>

            {/* Dropdown */}
            <div className="relative group">
              <button className="flex items-center  px-3 py-2 text-[24px] poppins-semibold">
                Select City
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-200 transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute hidden group-hover:block bg-white border rounded shadow-md z-10 mt-1 w-40">
                <a href="#action3"  className="block px-4 py-2 text-[18px] poppins-regular hover:bg-gray-100">BANGALORE</a>
                <a href="#action4" className="block px-4 py-2 text-[18px] poppins-regular hover:bg-gray-100">HYDERABAD</a>
                <a href="#action4" className="block px-4 py-2 text-[18px] poppins-regular hover:bg-gray-100">MUMBAI</a>
                <a href="#action5" className="block px-4 py-2 text-[18px] poppins-regular hover:bg-gray-100">DELHI</a>
              </div>
            </div>


            {/* Search Bar */}
            <form className="flex items-center space-x-2">
              <input
                type="search"
                placeholder="Search"
                className="px-3  py-1 text-[18px] poppins-regular border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-1 text-[18px] poppins-regular border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavScrollExample;
