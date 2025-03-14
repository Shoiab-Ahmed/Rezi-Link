import React from 'react';

const Navbar = () => {
  return (
    <div>
          <nav className="w-full flex justify-between items-center">
    
    <h1 className="text-[24px] font-bold">REZI-LINK</h1>

    <ul className="flex  text-[18px] px-4 py-1 gap-10 ">
      <li className="px-3 py-1 ">Home</li>
      <li className="px-3 py-1 ">Features</li>
      <li className="px-3 py-1 ">Blog</li>
      <li className="px-3 py-1 ">About Us</li>
    </ul>
  </nav>
    </div>

  );
};

export default Navbar;
