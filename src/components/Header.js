import React from 'react'

import { MdDashboard } from "react-icons/md";

const Header = () => {
  return (
    <div className= "navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme = "dark">
        <a className= "navbar-brand col-md-3 col-lg-2 me-0 p-3 fs-6 text-white fw-bold d-flex align-items-center" href= "/">
        <MdDashboard />
        <span className= "mx-2"> Dashboard</span>
        </a>

        <form className= "d-flex mx-4 d-none d-md-flex" role= "search">
            <input type= "search" className= "form-control me-2" placeholder= "search" aria-label= "search"/>
            <button className= "btn btn-primary" type= "submit">search</button>    
        </form>
    </div>
  )
}

export default Header