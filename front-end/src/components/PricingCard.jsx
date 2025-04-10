import React from 'react';
import { MdOutlineDoneOutline } from "react-icons/md";


const PricingCard = ({ plan, price, features,mybgcolor,mycolor }) => {

 
  return (
    
    <div style={{backgroundColor : mybgcolor || "black", color:mycolor || "white"}} className={` text-white rounded-xl w-[350px] shadow-lg overflow-hidden cursor-pointer transition-all transform hover:-translate-y-5  `}>
      <div className="p-6 text-center">
        <h2 style={{color:mycolor|| "#D4D4D4"}} className="text-2xl text-[#D4D4D4] capitalize    poppins-semibold  mb-2"><span className='text-[#9393ff]'>{plan}</span> Plan</h2>
        <p style={{color:mycolor|| "text-gray-400"}} className="text-sm text-gray-400 poppins-regular text-[14px] mb-6">
          Best for brands that need designs and websites.
        </p>

        <div className="text-3xl font-bold mb-1 poppins-semibold text-[22px]">
          {price} <span style={{color:mycolor|| "text-gray-400"}} className="text-sm poppins-regular text-[16px] text-[#D4D4D4]">/month</span>
        </div>
        <p style={{color:mycolor|| "text-gray-400"}} className="text-sm text-gray-400 poppins-regular text-[14px] mb-6">No hidden charges. Cancel anytime.

        </p>

        <ul className="space-y-3 text-sm poppins-regular text-[14px]">

          {features.map((item, i) => {

            return (
             
                <li key={i} className="text-start flex items-center gap-2 ">
                 <span><MdOutlineDoneOutline style={{color:mycolor|| "text-gray-400"}} className='text-[18px ] text-white' /></span>
                  {item}

                </li>
             
            )
          })}


          
        </ul>
      </div>

      <div className="bg-[#9393ff] text-center py-3 cursor-pointer hover:bg-[#9393ffa5] transition-all">
        <button className="text-black font-semibold cursor-pointer poppins-semibold text-[22px]  ">Subscribe Now</button>
      </div>
    </div>
  );
};

export default PricingCard;
