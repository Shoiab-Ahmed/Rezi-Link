import { useState, useEffect } from 'react';
import { MdArrowDropDownCircle } from "react-icons/md";
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { HiSwitchHorizontal } from "react-icons/hi";
import axios from 'axios';

function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [loginPopup,setLoginPopup]= useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [btn, setBtn] = useState("Seller");

  const [isSeller,setIsSeller] = useState(false)

  const handleSwitch = async () => {
    if (btn === "Seller") {
      setPopup(true); 
      setIsSeller(false) // open popup to collect seller data
    } else {
      setBtn("Seller"); // Toggle back to "Seller"
      localStorage.setItem("userType", "User");
      console.log("Switched to User Account");
      navigate('/dashboard'); 
      setIsSeller(false)
    }
  };


  
  const handleSeller = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/seller/add", {
        name,
        email,
        phone,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      setBtn("User");
      localStorage.setItem("userType", "Seller");
      setPopup(false);
      navigate('/seller');
      
      alert("Seller account created successfully!");
      console.log(response.data.message);
    } catch (e) {
      console.log("Received error while posting the data ", e);
    }
  };
  const handleLoginSeller = async (e) => {
    e.preventDefault();
    if ( !email || !phone) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/seller/login", {
      
        email,
        phone,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      setBtn("User");
      localStorage.setItem("userType", "Seller");
      setPopup(false);
      navigate('/seller');
      alert("Seller account logged in successfull!");
      console.log(response.data.message);
    } catch (e) {
      console.log("Received error while posting the data ", e);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "Seller") {
      setBtn("User");
      
      setIsSeller(true); 
    } else {
      setBtn("Seller");
      setIsSeller(false); 
    }
  }, []);

  return (
    <>
      <nav className="bg-[#e8e8ff] text-[#000038] rounded-lg shadow-md w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* LEFT: Logo + Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl poppins-semibold text-[24px] ">
                REZI-<span className=' text-[#9393ff]'>LINK</span>
              </Link>

              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link  to={isSeller?`/overview`:`/dashboard`} className="text-[18px] poppins-regular hover:text-[#9393ff] transform hover:-translate-y-1 transition-all hover:text-[20px]">
                  {isSeller ? "OverView" : "Home"}
                </Link>
                {isSeller && <Link to="/manage-properties" className="text-[18px] poppins-regular hover:text-[#9393ff] transform hover:-translate-y-1 transition-all hover:text-[20px]">
                 Manage Properties
                </Link>  }
                {isSeller && <Link to="/my-properties" className="text-[18px] poppins-regular hover:text-[#9393ff] transform hover:-translate-y-1 transition-all hover:text-[20px]">
                  My Properties
                </Link>  }
                {/* Dropdown */}
                {!isSeller &&<div className="relative group">
                  <button className="flex items-center gap-2 rounded-md px-3 py-2 text-[18px] poppins-regular">
                    Select City
                    <MdArrowDropDownCircle />
                  </button>

                  <div className="absolute hidden group-hover:block bg-white text-[#000038] border-[#000038] rounded shadow-md z-10 mt-1 w-40">
                    <Link to="/bangalore" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">BANGALORE</Link>
                    <Link to="/hyderabad" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">HYDERABAD</Link>
                    <Link to="/mumbai" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">MUMBAI</Link>
                    <Link to="/delhi" className="block px-4 py-2 text-[16px] poppins-regular hover:bg-gray-100">DELHI</Link>
                  </div>
                </div>
}
                {!isSeller &&  <input
                  type="search"
                  placeholder="Search"
                  className="px-3 py-2.5 text-[16px] poppins-regular border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                /> }
               
              </div>
            </div>

            {/* RIGHT: Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSwitch}
                className="px-4 py-2.5 flex items-center gap-3 text-[16px] poppins-regular rounded-lg border-[#000038] border text-[#000038] cursor-pointer transition"
              >
                <HiSwitchHorizontal className='text-[#000038] text-xl' />
                Switch To {btn}
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-4 py-2.5 text-[16px] poppins-regular rounded-lg bg-[#9393ff] text-white hover:text-white transition"
              >
                Logout
              </button>
            </div>

            {/* Toggle button for mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 md:hidden focus:outline-none ml-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <Link to="/dashboard" className="text-[18px] poppins-semibold">Home</Link>
              <Link to="/seller" className="text-[18px] poppins-semibold">Become Seller</Link>
              <Link to="/bangalore" className="text-[18px] poppins-semibold">BANGALORE</Link>
              <Link to="/hyderabad" className="text-[18px] poppins-semibold">HYDERABAD</Link>
              <Link to="/mumbai" className="text-[18px] poppins-semibold">MUMBAI</Link>
              <Link to="/delhi" className="text-[18px] poppins-semibold">DELHI</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Seller Popup */}
      {popup && (
        <div className="font-[Mypoppins] backdrop-blur-[2px] fixed inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] w-[520px] flex flex-col gap-[20px] p-6 rounded-lg shadow-lg">
            {/* Top */}
            <div className='flex justify-between items-center pb-5 border-b border-b-[#B0B0B0]'>
              <h1 className="poppins-semibold text-[36px]">Seller Details</h1>
              <button onClick={() => setPopup(false)} className='cursor-pointer border border-black/50 rounded-full p-1'>X</button>
            </div>
            {/* Form */}
            <form onSubmit={handleSeller} className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col gap-[13px]">
                <h2 className="poppins-semibold text-[20px]">Name</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type here."
                  className="text-[#000000] px-5 py-2.5 border poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                />
              </div>
              <div className="w-full flex flex-col gap-[13px]">
                <h2 className="poppins-semibold text-[20px]">Email</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type here."
                  className="text-[#000000] px-5 py-2.5 border poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                />
              </div>
              <div className="w-full flex flex-col gap-[13px]">
                <h2 className="poppins-semibold text-[20px]">Contact No.</h2>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Type here."
                  className="text-[#000000] px-5 py-2.5 border poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="poppins-semibold text-[16px] w-full h-[40px] rounded-[8px] bg-[#9393ff] text-white cursor-pointer"
              >
                Submit Seller Details
              </button>
            </form>
            <p>Already a Seller? Switch <button onClick={()=>{
              setPopup(false)
              setLoginPopup(true)
            }}>Here</button></p>
          </div>
        </div>
      )}

      {/* loginpopup */}

      {loginPopup && (
        <div className="font-[Mypoppins] backdrop-blur-[2px] fixed inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="bg-white max-sm:w-[320px] max-sm:h-[200px] w-[520px] flex flex-col gap-[20px] p-6 rounded-lg shadow-lg">
            {/* Top */}
            <div className='flex justify-between items-center pb-5 border-b border-b-[#B0B0B0]'>
              <h1 className="poppins-semibold text-[36px]">Seller Login Details</h1>
              <button onClick={() => setLoginPopup(false)} className='cursor-pointer border border-black/50 rounded-full p-1'>X</button>
            </div>
            {/* Form */}
            <form onSubmit={handleLoginSeller} className="w-full flex flex-col gap-5">
             
              <div className="w-full flex flex-col gap-[13px]">
                <h2 className="poppins-semibold text-[20px]">Email</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type here."
                  className="text-[#000000] px-5 py-2.5 border poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                />
              </div>
              <div className="w-full flex flex-col gap-[13px]">
                <h2 className="poppins-semibold text-[20px]">Contact No.</h2>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Type here."
                  className="text-[#000000] px-5 py-2.5 border poppins-regular text-[16px] border-[#000000]/20 rounded-[8px] outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="poppins-semibold text-[16px] w-full h-[40px] rounded-[8px] bg-[#9393ff] text-white cursor-pointer"
              >
                Submit Seller Details
              </button>
            </form>
            <p>New as  a Seller? Switch <button onClick={()=>{
              setPopup(true)
              setLoginPopup(false)
            }}>Here</button></p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar2;
