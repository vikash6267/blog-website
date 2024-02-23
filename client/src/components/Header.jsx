import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";
import { MdAddchart } from "react-icons/md";
import "./Header.css"
import logo from "../assests/images/logo.png"
export default function Header() {
  const location = useLocation();
  const { pathname } = location;
  return (
   <div className="bg-[#1b3044]"> 
   <header className="nav-header">
   <Link to="/" className="link"
     
   >
     <span className="logo-icon">
      <img src={logo} alt="" className="lg:h-[50px] lg:w-[110px] h-[45px] w-[60px]" />
     </span>
     IdeaUsher
   </Link>

   <input type="checkbox" className="peer hidden" id="navbar-open" />
   <label
     className="absolute top-5 right-7 cursor-pointer md:hidden"
     htmlFor="navbar-open"
   >
     <span className="sr-only">Toggle Navigation</span>
     <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       strokeWidth="2"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M4 6h16M4 12h16M4 18h16"
       />
     </svg>
   </label>

   <nav
     aria-label="Header Navigation"
    
   >
     <ul >
       <li
         className={`${
           pathname === "/" ? "yes" : "no"
         }`}
       >
         <Link to="/"><span className="button-icon "><FaBlog /> All Blogs</span> </Link>
       </li>
       <li
         className={`${
           pathname === "/addpost" ? "yes" : "no"
         }`}
       >
         <Link to="/addpost"><span className="button-icon" ><MdAddchart  /> Add Blogs</span></Link>
       </li>
 
     </ul>
   </nav>
 </header>
 </div>
  );
}
