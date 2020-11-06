import React from 'react';
import { Link } from "react-router-dom"
import LinkPrivate from './LinkPrivate'

const Menu = () => {
  return (
    <div id="Menu">
      <Link to="/">Home</Link>
      <div style={{ float: 'right' }}>
        <Link to="/user/login">Login</Link>
        <LinkPrivate to="/article/create" label="Post Article" />
      </div>
    </div>
  )
}

export default Menu;