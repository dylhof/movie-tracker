import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const member = false;
  return (
    <div className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to={(member) ? '/Favorites' : '/Login'}>
        Favorites
      </NavLink>
      <NavLink exact to='/Login'>Sign in/Sign up</NavLink>
      {/* this navlink will take you to a new login page*/}
    </div>
  );
}