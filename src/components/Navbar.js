import React from 'react';
import "./Navbar.css"

function Navbar() {
  return (
    <div className='NavbarContainer'>
        <h3 className='logo'>UCRUD</h3>
        <div className="userSearch">
            <input type="text" placeholder='Type user name or Id' />
        </div>
        
    </div>
  )
}

export default Navbar