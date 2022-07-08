import React from 'react';
import logo from '../images/Vector.svg';
import { Link } from 'react-router-dom';
import '../index.css';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" id="logo" src={logo} alt="logo" />
      <p className='header__email'>{props.loggedIn ? props.userEmail : ''}</p>
      <Link
        className='header__link'
        to={props.link.to}
        onClick={props.onLogout ? props.onLogout : null}
      >{props.link.description}</Link>
    </header>
  )
}
export default Header; 
