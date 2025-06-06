import React from 'react'
import PricingCard from './components/PricingCard'
import NavScrollExample from './components/Navbar2'


const Pricings = () => {

  const basic = ["Unlock Upto 10 Property Contacts", "Unlimited Search Accsess " ,"Basic support via email","No Live Property Support", "Ideal for users just starting their property search"]
  const bussiness = ["Unlock Upto 25 Property Contacts", "Unlimited Search Accsess ","Get priority customer support","Access to exclusive city-based insights", "Great for agents, investors, or serious buyers" ]
  return (
    <div className='bg-[#FAFAFA]'>

      <NavScrollExample/>
      <div>

        <h1 className='text-center poppins-bold text-[36px] my-10'>Choose our Best Plans Here</h1>

        <div className='flex justify-center items-center gap-15'>
        <PricingCard plan="basic" price="799" features={basic} mybgcolor= "white" mycolor="black" />
        <PricingCard  plan="bussiness" price="1199"  features={bussiness} />
        </div>
     
      </div>
      
    </div>
  )
}

export default Pricings
