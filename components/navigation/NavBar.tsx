import React from 'react'
import { NavBarMenu } from './NavBarMenu'
import Image from 'next/image'

import logo from '../../public/cyphrkey.jpg'
import { Button } from '../ui/button'
import { MobileNavBar } from './MobileNavBar'
import { Link } from '@/navigation'



const NavBar = () => {
    return (
        <div className='flex flex-row h-20 items-center justify-between w-full '>
            <Link href="/" aria-label='Home - Bitcoin Uni Vanity Service'>
                <div className="ml-4 flex flex-row items-center gap-2">
                    <Image
                        src={logo}
                        alt=""
                        width={50} height={50}
                        className='rounded-full transition-all duration-500 hover:opacity-70 '
                    />
                    <p className=' hidden lg:block font-semibold text-xl text-white'>Bitcoin Uni - Vanity Service</p>
                </div>
            </Link>
            <div className=' hidden md:block mr-[7%]'>
                <NavBarMenu />
            </div>
            <div className='gap-4'>
                <Link className='text-white font-semibold pl-2' href="/" locale="en" >English</Link>

                <Link className='text-white font-semibold pl-2' href="/" locale="de" >Deutsch</Link>
            </div>
            <div className='mr-10 hidden md:block'>
                <Button className='' variant="default">
                    Login
                </Button>
            </div>
            <div className='mr-4   md:hidden'>
                <MobileNavBar />
            </div>
        </div>
    )
}

export default NavBar