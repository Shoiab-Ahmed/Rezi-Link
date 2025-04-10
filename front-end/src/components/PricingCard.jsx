import React from 'react';

const PricingCard = () => {
  return (
    <div className="bg-black text-white rounded-xl w-[300px] shadow-lg overflow-hidden m-[50px]  ">
      <div className="p-6 text-center">
        <h2 className="text-xl poppins-semibold text-[22px] mb-2">Basic Plan</h2>
        <p className="text-sm text-gray-400 poppins-regular text-[14px] mb-6">
          Best for brands that need designs and websites.
        </p>

        <div className="text-3xl font-bold mb-1 poppins-semibold text-[22px]">
          1099 <span className="text-sm poppins-regular text-[18px]"> / month</span>
        </div>
        <p className="text-sm text-gray-400 poppins-regular text-[14px] mb-6">No hidden charges. Cancel anytime.

</p>

        <ul className="space-y-3 text-sm poppins-regular text-[14px]">
          <li className="flex items-center ">
            <span className="text-green-400 mr-2">✔</span>
            Browse property listings

          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✔</span>
            Contact property owners directly

          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2 ">✔</span>
            Schedule property visits
          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✔</span>
            Basic support via email


          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✔</span>
            Live priority support
          </li>
        </ul>
      </div>

      <div className="bg-lime-400 text-center py-3 cursor-pointer hover:bg-lime-500 transition-all">
        <button className="text-black font-semibold cursor-pointer poppins-semibold text-[22px]  ">Subscribe Now</button>
      </div>
    </div>
  );
};

export default PricingCard;
