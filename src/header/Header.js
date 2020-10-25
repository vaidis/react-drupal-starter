import React from 'react';
import { Link } from "react-router-dom";
import UserName  from '../user/UserName'

const Header = () => {
    return (
        <div id="header">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>
            <div>
                <UserName />
            </div>
        </div>
    );
}

export default Header;

