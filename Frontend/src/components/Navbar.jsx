import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,GetCartData, token, setToken, navigate , setCartItem}=useContext(ShopContext)
  const logout = ()=> {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItem({})
  }
  return (
    <div className="flex items-center justify-between py-5 font-medium border border-b-1 border-l-0 border-r-0">
      {/* <img className="w-36" src={assets.logo} alt="" /> */}
      <NavLink to="/">
      <h1 className="text-2xl font-semibold cursor-pointer">SMART BUY</h1>
      </NavLink>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col gap-1 items-center">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col gap-1 items-center">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col gap-1 items-center">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col gap-1 items-center">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* 
        search icon and dropdown menu
         */}
      <div className="flex items-center gap-5">
       
        <img className="w-5 cursor-pointer" src={assets.search_icon} onClick={()=>setShowSearch(true)} alt="" />
     
        <div className="group relative">
          <img
          onClick={()=> token ? null : navigate("/login")}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
  {/* Dropdown Menu */}
            {token && <div className="group-hover:block hidden absolute dropdown-menu pt-5 right-0 ">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 text-gray-500 rounded ">
              <p className="cursor-pointer hover:text-black">My Profile</p>
             <p onClick={()=> navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p> 
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div> 
            </div> 
             }
             </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {GetCartData()}
          </span>
        </Link>
        {/* for mobile screen */}
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
          onClick={() => setVisible(true)}
        />
      </div>
      {/* sidebar meun for small screens */}
       <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>back</p>
          </div>
          <Link onClick={()=>setVisible(false)} className=" border  rounded py-2 pl-6 cursor-pointer  text-black" to='/'>HOME</Link>
          <Link onClick={()=>setVisible(false)} className=" border  rounded py-2 pl-6 cursor-pointer  text-black" to='/collection'>COLLECTION</Link>
          <Link onClick={()=>setVisible(false)} className=" border  rounded py-2 pl-6 cursor-pointer  text-black" to='/about'>ABOUT</Link>
          <Link onClick={()=>setVisible(false)} className=" border  rounded py-2 pl-6 cursor-pointer  text-black" to='/contact'>CONTACT</Link>
        </div>
        </div>
        
      
    
    </div>
  );
};

export default Navbar;
