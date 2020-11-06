import React from 'react';

import Logo from './Logo'
import Menu from './Menu'
import UserName from '../user/UserName'

const Header = () => {
  return (
    <div id="header">
      <Logo />
      <Menu />
      <UserName />
    </div>
  );
}

export default Header;

