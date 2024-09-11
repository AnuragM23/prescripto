import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex align-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img src={assets.logo} alt="" />
      <ul>
        <NavLink>
          <li className="">HOME</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>ALL DOCTORS</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>ABOUT</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>CONTACT</li>
          <hr />
        </NavLink>
      </ul>
      <div className="">Create Account</div>
    </div>
  );
}

export default Navbar;
