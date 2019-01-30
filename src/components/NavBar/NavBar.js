import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const member = false;
  return (
    <div className="NavBar">
      <NavLink to="/">Home</NavLink>
      <NavLink to={(member) ? '/Favorites' : '/Login'}>
        Favorites
      </NavLink>
      <NavLink to='/Login'>Sign in/Sign up</NavLink>
      {/* this navlink will take you to a new login page*/}
    </div>
  );
}