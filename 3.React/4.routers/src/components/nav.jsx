import React from 'react'
import { NavLink } from 'react-router-dom'


const getNavLinkClass = ({ isActive }) => 
  isActive 
    ? 'text-gray-800 bg-gray-300 px-4 py-2 rounded-t-lg' 
    : 'text-gray-200 hover:text-white px-4 py-2';

const nav = () => {
  return (
    <div className=' flex justify-center gap-10 pt-5 text-3xl font-semibold mb-20 capitalize border-b bg-gray-400'>
        <NavLink className={getNavLinkClass} to="/">Home</NavLink>
        <NavLink className={getNavLinkClass} to="/product">product</NavLink>
        <NavLink className={getNavLinkClass} to="/service">Sevice</NavLink>
        <NavLink className={getNavLinkClass} to="/about">About</NavLink>
    </div>
  )
}

export default nav