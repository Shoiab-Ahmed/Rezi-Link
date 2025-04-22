import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserNav from './components/UserNav'
import al from './assets/al.png'
import { FaLocationDot } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdResize } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Footer from './components/Footer'

import { Link } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";



import user from './assets/user.png'
import NavScrollExample from './components/Navbar2'
import { useAuth } from './AuthContext'








const Property = () => {
  const [picture, setPicture] = useState("");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [remainingUnlocks, setRemainingUnlocks] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [staticmap, setStaticmap] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1969751763827!2d77.74395297516384!3d12.959244115148914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0df63f36adb7%3A0x64f8cb64c5612c33!2s123%2C%20Whitefield%20Main%20Rd%2C%20Palm%20Meadows%2C%20Siddapura%2C%20Whitefield%2C%20Bengaluru%2C%20Karnataka%20560066!5e0!3m2!1sen!2sin!4v1744206489014!5m2!1sen!2sin")

  const params = useParams();
  const { isAuthenticated } = useAuth();

  const handleUnlockContact = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/users/unlock-contact",
        { property_id: params.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status === "success") {
        console.log(res.data.status)
        setShowContact(true);
        setHasPurchased(true);
        setRemainingUnlocks(res.data.remaining_limit);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Unlock failed", error);
      alert("Something went wrong while unlocking contact.");
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/properties");
        setAllProperties(response.data);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };
    fetchdata();

    const fetchUnlockStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`http://127.0.0.1:5000/users/unlock-status/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === "success") {
          setHasPurchased(res.data.hasPurchased);
          setRemainingUnlocks(res.data.remainingUnlocks);
          setShowContact(res.data.showContact);
        }
      } catch (err) {
        console.error("Error fetching unlock status", err);
      }
    };

    fetchUnlockStatus();
  }, [params.id]);

  const mainItem = allProperties.filter((item) => item._id === params.id);
  let maps = mainItem.map((item) => item.location.maps ? item.location.maps : staticmap);


  const suggestions = allProperties.filter(
    (item) => item.location.city === mainItem[0]?.location.city && item._id !== mainItem[0]?._id
  );

  const formatPrice = (price) => {
    if (price >= 10000000) return (price / 10000000).toFixed(1) + " Cr";
    else if (price >= 100000) return (price / 100000).toFixed(1) + " L";
    else if (price >= 1000) return (price / 1000).toFixed(1) + " K";
    return price;
  };
  return (
    <>

      {isAuthenticated ? <div>


        <NavScrollExample />
        {mainItem.map((item) => {
          return (
            <div key={item._id} className='flex flex-col w-[95%] mx-auto mt-[30px] gap-[30px] '>
              <div className='flex h-full gap-[20px]'>
                <div className='w-[60%] flex flex-col gap-[20px] '>
                  <img src={picture?picture:item.images[0]} className='w-full h-[400px] rounded-[9px] object-cover' />
                  <div className='flex gap-[20px] '>
                    {item.images.map((img, i) => {
                      return (
                        <button onClick={() => setPicture(img)} key={i} className='cursor-pointer'>
                          <img src={img} className='w-[200px] h-[150px] rounded-[9px]' />
                        </button>

                      )
                    })}



                  </div>
                </div>

                <div className=' w-[40%]'>
                  <iframe src={maps} width="400" height="300" className='border-0 w-full h-full rounded-xl' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>

              </div>

              {/* below divs */}
              <div className='flex justify-between '>
                <div className='w-[60%] flex flex-col gap-[20px]'>
                  <div className='flex flex-col gap-[15px]'>
                    <p className='poppins-semibold text-[28px] text-gray-600 flex items-center '><FaRupeeSign /> <span>{formatPrice(item.price)}</span>            </p>
                    <h1 className='poppins-semibold text-[32px] capitalize'>{item.title}({item.area_sqft} sqft)</h1>
                    <p className='poppins-regular text-[20px] text-gray-600'>{item.description}</p>




                  </div>
                  <div className='flex flex-row gap-[10px] w-full items-center'>
                    <h1 ><FaLocationDot className='text-[22px]' />

                    </h1>
                    <p className='poppins-regular text-[22px] tracking-[1px]'>{item.location.address},{item.location.city},{item.location.state},{item.location.zip_code}</p>
                  </div>
                  <div className='flex flex-row gap-[200px] w-full items-center'>
                    <div className='flex flex-row row gap-[10px] items-center' >
                      <h1 ><GrHomeRounded className='text-[20px]' />              </h1>


                      <p className='poppins-regular text-[20px]'>{item.property_type}</p>
                    </div>
                    <div className='flex flex-row  gap-[10px] items-center'>
                      <p><IoMdResize className='text-[22px]' />              </p>
                      <p className='poppins-regular text-[20px]'>{item.area_sqft} sqrt</p>
                    </div>




                  </div>

                  <div className='w-full mt-5 flex flex-col gap-[20px]'>
                    <h1 className='poppins-bold  text-[22px]'>Furnishings</h1>
                    <div className='flex flex-row items-center  gap-[40px] mt-5'>
                      <div className='flex flex-row gap-[20px] items-center'>
                        <IoBedOutline className='text-[26px]' />
                        <div>
                          <h1 className='poppins-semibold text-[20px]'>Bed Room</h1>
                          <p className='poppins-regular text-[14px]'> {item.furnishings.bedroom?.map((Bed) => { return <span> {Bed} </span> })}</p>
                        </div>
                      </div>
                      <div className='flex flex-row gap-[20px] items-center'>
                        <MdOutlineMeetingRoom className='text-[26px]' />
                        <div>
                          <h1 className='poppins-semibold text-[20px]'>Hall</h1>
                          <p className='poppins-regular text-[14px]'> {item.furnishings.hall?.map((Bed) => { return <span> {Bed} </span> })}</p>
                        </div>
                      </div>
                      <div className='flex flex-row gap-[20px] items-center'>
                        <FaBath className='text-[26px]' />
                        <div>
                          <h1 className='poppins-semibold text-[20px]'>Bath Room</h1>
                          <p className='poppins-regular text-[14px]'> {item.furnishings.bathroom?.map((Bed) => { return <span> {Bed} </span> })}</p>
                        </div>
                      </div>                <div className='flex flex-row gap-[20px] items-center'>
                        <FaKitchenSet className='text-[26px]' />
                        <div>
                          <h1 className='poppins-semibold text-[20px]'>Kitchen</h1>
                          <p className='poppins-regular text-[14px]'> {item.furnishings.kitchen?.map((Bed) => { return <span> {Bed} </span> })}</p>
                        </div>
                      </div>
                    </div>
                    {/* <p className='poppins-regular text-[20px]'>Bed Rooms - {item.furnishings.bedroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
        <p className='poppins-regular text-[20px]'>Hall - {item.furnishings.hall?.map((Bed)=>{return <span> {Bed} </span> })}</p>
        <p className='poppins-regular text-[20px]'>Bath Room - {item.furnishings.bathroom?.map((Bed)=>{return <span> {Bed} </span> })}</p>
        <p className='poppins-regular text-[20px]'>Kitchen - {item.furnishings.kitchen?.map((Bed)=>{return <span> {Bed} </span> })}</p>
        */}



                    {/* tags */}
                    <div className="flex flex-wrap gap-5 mt-10 ">
                      {item.tags.map((word, index) => (
                        <span
                          key={index}
                          className=" px-4 py-2 rounded-[5px] text-[15px] bg-[#f5f3f3] "
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


                {/* contact pricing info */}
                <div className="w-[35%]">
                  {!showContact ? (
                    !hasPurchased ? (
                      <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-center">
                        <p className="font-medium text-yellow-800 flex items-center justify-center gap-2">
                          <FaLock /> Contact info is locked
                        </p>
                        <Link to="/pricings" className="text-purple-700 underline">
                          Purchase a plan
                        </Link>
                      </div>
                    ) : remainingUnlocks <= 0 ? (
                      <div className="bg-[#e8e8ff] border border-yellow-300 p-4 rounded-md text-center">
                        <p className="font-medium text-yellow-800 flex items-center justify-center gap-2">
                          <FaLock /> Unlock limit reached
                        </p>
                        <Link to="/pricings" className="text-purple-700 underline">
                          Upgrade or repurchase
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={handleUnlockContact}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
                      >
                        Unlock Contact Info
                      </button>
                    )
                  ) : (
                    <div className="border p-6 rounded-2xl bg-[#e8e8ff] shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]">
                      <h3 className="text-xl font-semibold text-[#3c3c74] mb-4 poppins-semibold">Contact Info</h3>
                      {item.contacts?.slice(0, 3).map((contact, idx) => (
                        <div
                          key={idx}
                          className="mb-4 p-4 rounded-lg bg-white shadow-sm border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]"
                        >
                          <p className="text-gray-700 mb-1 poppins-regular">
                            <span className="font-medium text-[#3c3c74]">Name:</span> {contact.name}
                          </p>
                          <p className="text-gray-700 mb-1 poppins-regular">
                            <span className="font-medium text-[#3c3c74]">Phone:</span> {contact.phone}
                          </p>
                          <p className="text-gray-700 poppins-regular">
                            <span className="font-medium text-[#3c3c74]">Email:</span> {contact.email}
                          </p>
                        </div>
                      ))}
                    </div>

                  )}
                </div>




              </div>
              {/* suggesstions */}

              <div >
                <h1 className="  my-[70px] text-center text-[40px] poppins-bold tracking-[2px]">Similar Properties in {mainItem[0]?.location.city}</h1>
                <div className="grid grid-cols-3 gap-[30px]">
                  {suggestions.slice(0, 6).map((sugg) => (
                    <Link to={`/property/${sugg._id}`} key={sugg._id} className="shadow-md rounded-[10px] overflow-hidden bg-white hover:scale-[1.02] transition-all duration-200">
                      <img src={sugg.images[0] ? sugg.images[0] : picture} alt="property" className="h-[200px] w-full object-cover" />
                      <div className="p-4 flex flex-col gap-[8px]">
                        <h2 className="text-[20px] poppins-semibold capitalize">{sugg.title}</h2>
                        <p className="text-[16px] text-gray-500">{sugg.location.address}, {sugg.location.city}</p>
                        <p className="text-[18px] text-[#714FAE] font-semibold flex items-center"><FaRupeeSign />          {formatPrice(sugg.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>



              {/* connect form */}
              <h1 className='text-center text-[40px] poppins-bold tracking-[2px]'>Connect With Us</h1>
              <div className='w-[80%] h-[595px] bg-[#f5f3f3]  rounded-[22px] mx-auto flex mt-[50px] '>
                <div className='w-[545px] mx-auto py-12 flex flex-col justify-between'>
                  <div className=' flex flex-col gap-5'>
                    <h1 className='text-[64px] marcellus text-[#313131]'>Let's Connect</h1>
                    <p className="text-[14px] poppins-regular text-justify ">
                      Need help with your listing, service request, or account? Just drop your details below, and our team will reach out shortly to assist you.

                    </p></div>

                  <div className='text-[#313131]/40 text-center'> __ </div>
                  <form action="" className=' flex flex-col gap-5 w-full'>

                    <input type="text" name="" id="" placeholder='Name' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                    <input type="email" name="" id="" placeholder='Email' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                    <input type="text" name="" id="" placeholder='Phone number' className=' border-[1px] border-[#313131]/40 px-[20px] py-[13px] rounded-[8px]' />
                    <input type="submit" name="" id="" value="Send" className=' text-white bg-[#9393ff] cursor-pointer hover:bg-[#9393ff]/90 px-[20px] py-[13px] rounded-[8px] poppins-semibold text-[16px]' />

                  </form>

                </div>

                <div className='overflow-hidden bg-cover shadow-2xl  '>
                  <img className='w-[488px] h-[595px] object-cover' src={item.images[0]} alt="" />
                </div>
              </div>


            </div>
          )
        })}
        <Footer />






      </div> : <div className='flex justify-center items-center h-screen'>YOU SHOULD BE LOGGED IN TO SEE THIS PAGE</div>}

    </>
  )
}

export default Property