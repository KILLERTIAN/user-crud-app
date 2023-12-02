import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className='NavbarContainer'>
      <h3 className='logo'><Link to='/' className='logoLink'>UCRUD</Link>
      </h3>
      <div className='searchMenu'>
        <div className='userSearch'>
          <input type='text' placeholder='Search user name or Id' className='searchInput'/>
          <ion-icon className='userSearchIcon' name='search'></ion-icon>
        </div>
        <button className='menuButton' onClick={() => {console.log('Button clicked');setShowMobileMenu(true)} }>
          <ion-icon name='menu-outline'></ion-icon>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className='menuContainer show'>
          <ion-icon
            className='close-icon'
            name='close-outline'
            onClick={() => setShowMobileMenu(false)}
          ></ion-icon>
          <ul onClick={() => setShowMobileMenu(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/'>Create User</Link>
            </li>
            <li>
              <Link to='/'>Update User</Link>
            </li>
            <li>
              <Link to='/'>Delete User</Link>
            </li>
            <li>
              <Link to='/'>Create a Team</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
