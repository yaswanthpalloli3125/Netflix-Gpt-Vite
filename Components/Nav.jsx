import React from 'react'
import { NavLink } from "react-router-dom";



const navActive = ({isActive}) => (isActive)? "active-link":"";

const Nav = () => {



  return (
    <div>
    <nav className='nav-bx'>
      <div>
      <img className='logo' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'></img>

      </div>
        <div>
        <NavLink
          to={{
            pathname: "/",
           
          }} className={navActive}
        >
          Home
        </NavLink>

        <NavLink
          to={{
            pathname: "/profile",
            search: "profile",
          }} className={navActive}
        >
          Profile
        </NavLink>

        <NavLink
          to={{
            pathname: "/about",
            search: "about",
          }} className={navActive}
        >
          About
        </NavLink>
        </div>
        
      </nav>
    </div>
  )
}

export default Nav