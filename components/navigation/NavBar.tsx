import React from 'react'
import { NavBarMenu } from './NavBarMenu'
import Logo from './Logo'
import Login from './Login'

const NavBar = () => {
  return (
    <div className='flex'>
        <Logo />
        <NavBarMenu />
        <Login />
    </div>
  )
}

export default NavBar