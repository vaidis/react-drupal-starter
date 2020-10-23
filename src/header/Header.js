import React from 'react';
import { Link } from "react-router-dom";
import UserName  from '../user/UserName'
import UserStatus from '../user/UserStatus'

const Header = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>
            <div>
                <UserName />
                <UserStatus />
            </div>
        </div>
    );
}

export default Header;

