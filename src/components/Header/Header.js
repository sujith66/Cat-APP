import React from 'react';
import {Link} from 'react-router-dom';
import catlogo from '../../images/catlogo.png';
import './Header.css'
const Header = () => {
    return (
        <div className="header">
            <Link to='/'><img className="header__image" src={catlogo} alt="Cat App"/></Link>
            <h3>Cat App</h3>
        </div>
    )
}

export default Header
