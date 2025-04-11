import React from 'react';
import { MdOutlineDoneOutline } from "react-icons/md";
import axios from 'axios';

const PricingCard = ({ plan, price, features, mybgcolor, mycolor }) => {

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token"); // if you use JWT in localStorage

      // Step 1: Create order on backend
      const orderRes = await axios.post(
        "http://127.0.0.1:5000/payments/create-order",
        { amount: Number(price) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order_id, razorpay_key, amount } = orderRes.data;

      // Step 2: Initialize Razorpay
      const options = {
        key: razorpay_key,
        amount: amount,
        currency: "INR",
        name: "ReziLink",
        description: `${plan} Plan Subscription`,
        order_id: order_id,
        handler: async function (response) {
          // Step 3: Verify Payment
          const verifyRes = await axios.post(
            "http://127.0.0.1:5000/payments/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: price,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyRes.data.status === "success") {
            alert("Payment Successful!");
            
          } else {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: "ReziLink User",
          email: "user@example.com",
        },
        theme: {
          color: "#9393ff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: mybgcolor || "black", color: mycolor || "white" }} className="text-white rounded-xl w-[350px] shadow-lg overflow-hidden cursor-pointer transition-all transform hover:-translate-y-5">
      <div className="p-6 text-center">
        <h2 className="text-2xl capitalize poppins-semibold mb-2"><span className='text-[#9393ff]'>{plan}</span> Plan</h2>
        <p className="text-sm poppins-regular text-[14px] mb-6">
          Best for brands that need designs and websites.
        </p>
        <div className="text-3xl font-bold mb-1 poppins-semibold text-[22px]">
          ₹{price} <span className="text-sm poppins-regular text-[16px] text-[#D4D4D4]">/month</span>
        </div>
        <p className="text-sm poppins-regular text-[14px] mb-6">
          No hidden charges. Cancel anytime.
        </p>

        <ul className="space-y-3 text-sm poppins-regular text-[14px]">
          {features.map((item, i) => (
            <li key={i} className="text-start flex items-center gap-2">
              <span><MdOutlineDoneOutline className='text-[18px ] text-white' /></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#9393ff] text-center py-3 cursor-pointer hover:bg-[#9393ffa5] transition-all">
        <button className="text-black font-semibold cursor-pointer poppins-semibold text-[22px]" onClick={handlePayment}>Subscribe Now</button>
      </div>
    </div>
  );
};

export default PricingCard;
