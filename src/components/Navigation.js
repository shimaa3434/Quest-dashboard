import React from 'react'
import TooltipBtn from "./TooltipBtn"
import { BsEnvelopeAtFill, BsCalculatorFill, BsFillGearFill } from "react-icons/bs"
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { HiMiniUsers } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { BsFilePost } from "react-icons/bs";



const Navigation = () => {
    const navigate = useNavigate()
  return (
    <div className= "h-100 d-flex flex-column justify-content-between pb-5">
        <ul className= "nav flex-column list-unstyled">
            <li className= "nav-item py-2 d-flex justify-content-center">
                <Link className= "nav-link" to="/posts">
                    <TooltipBtn icon={<BsFilePost />} name= "Posts"/>
                </Link>
            </li>
            <li className= "nav-item py-2 d-flex justify-content-center">
                <Link className= "nav-link" to="/user">
                    <TooltipBtn icon={<HiMiniUsers />} name= "users"/>
                </Link>
            </li>
            <li className= "nav-item py-2 d-flex justify-content-center">
                <Link className= "nav-link" to="/products">
                    <TooltipBtn icon={<AiFillProduct  />} name= "Products"/>
                </Link>
            </li>
        </ul>
         <ul className= "nav flex-column list-unstyled mb-5">
            <li className= "nav-item py-2 d-flex justify-content-center" onClick={()=>{
                localStorage.removeItem("user")
                navigate("/")
            }}>
                <TooltipBtn icon={<RiLogoutBoxRLine />} name= "logout"/>
            </li>
        </ul>
    </div>
  )
}

export default Navigation