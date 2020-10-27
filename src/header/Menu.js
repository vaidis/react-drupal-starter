import React from 'react';
import { Link } from "react-router-dom"

const Menu = () => {

    return (
        <div id="Menu">
            <Link to="/">Home</Link>
            <Link to="/user/login">Login</Link>
            <Link to="/article/create">Post Article</Link>
        </div>
    )
}

export default Menu;