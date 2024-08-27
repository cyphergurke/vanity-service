"use client"

import React from 'react'
import Image from 'next/image'

import logo from '../../public/favicon/android-chrome-192x192.png'
import { MobileNavBar } from './MobileNavBar'
import { Link } from '@/navigation'
import LanguageToggle from './LanguageToggle'
import { useLocale, useTranslations } from 'next-intl'
import { navItems } from '@/data'



const NavBar = () => {
    const locale = useLocale()

    const h = useTranslations('Navigation');
    const translate = {
        home: h('home'),
        about: h('about'),
        contact: h('contact'),
        faq: h('faq'),
        guide: h('guide'),
    };
    const translatedNavItems = navItems(translate)

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
            <div className=' hidden md:block mx-auto text-center'>
                <div className='flex flex-row gap-5'>
                    {translatedNavItems.map((navItem: any, idx: number) => (
                        <Link
                            key={`link=${idx}`}
                            href={`/${navItem.link}`}
                            className="relative flex items-center"
                        >
                            <span className="block sm:hidden">{navItem.icon}</span>
                            <span className="text-white text-lg cursor-pointer transition-all duration-300 hover:text-violet-200">
                                {navItem.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='gap-4 mr-14 hidden md:lg:block text-white'>
                <LanguageToggle />
            </div>
            <div className='mr-4   md:hidden'>
                <MobileNavBar />
            </div>
        </div>
    )
}

export default NavBar