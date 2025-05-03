import React from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
          <nav className="w-full flex justify-between items-center">
    
    <h1 className="text-[30px] poppins-bold">REZI-LINK</h1>

    <ul className="flex  text-[24px] px-4 py-1 gap-10 poppins-regular ">
      <li className="px-3 py-1 "><NavLink to='/'> Home</NavLink> </li>
      <li className="px-3 py-1 ">Features</li>
      <li className="px-3 py-1 underline"><NavLink to='/signup'>SignUp</NavLink></li>
      <li className="px-3 py-1 underline "><NavLink to='/login'> Login</NavLink> </li>
    </ul>
  </nav>
    </div>

  );
};

export default Navbar;
