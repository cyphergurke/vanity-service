"use client"

import { navItems } from '@/data'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../public/favicon/android-chrome-192x192.png'

const Footer = () => {
  const locale = useLocale()
  const currentYear = new Date().getFullYear();

  const h = useTranslations('Navigation');
  const translate = {
    home: h('home'),
    contact: h('contact'),
    faq: h('faq'),
    guide: h('guide'),
  };
  const translatedNavItems = navItems(translate)

  return (
    <>
      <div className="relative bottom-0 w-full  pt-5  ">
        <div className="absolute inset-0 bg-slate-950 opacity-45"></div>
        <div className='flex flex-col h-full '>
          <div className="relative z-10 flex md:lg:flex-row w-full justify-between px-4 pb-2 
          md:lg:px-20 items-center h-full ">
            <div className='flex flex-col md:lg:flex-row gap-4 sm:'>

              <Link href="/" aria-label='Home - Bitcoin Uni Vanity Service'>
                <div className="  flex flex-row items-center gap-2">
                  <Image
                    src={logo}
                    alt=""
                    width={90} height={90}
                    className='rounded-full transition-all duration-500 hover:opacity-70 '
                  />
                </div>
              </Link>
              <div className='flex flex-col'>
                <p className='text-lg text-white'>Links</p>
                <Link href='https://bitcoin-uni.de' className='text-violet-300  text-md transition-all duration-300 hover:text-violet-200' >Bitcoin Uni</Link>
                <Link href='https://cypherweb.dev' className='text-violet-300  text-md transition-all duration-300 hover:text-violet-200' >Cypherweb Development</Link>
              </div>

            </div>
            <div className='flex flex-col md:lg:flex-row gap-4 md:lg:justify-between'>
              <div className='flex flex-col '>
                {translatedNavItems.map((navItem: any, idx: number) => (
                  <Link
                    key={`link=${idx}`}
                    href={`/${locale}${navItem.link}`}
                    className="relative flex items-center"
                  >
                    <span className="block sm:hidden">{navItem.icon}</span>
                    <span className="text-violet-300 text-md cursor-pointer transition-all duration-300 hover:text-violet-200">
                      {navItem.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className='flex flex-col '>
                <Link href={`/${locale}/legal`} className='text-violet-300 text-md hover:text-violet-200'>
                  Legal
                </Link>
                <Link href={`/${locale}/legal/dsgvo`} className='text-violet-300 text-md transition-all duration-300 hover:text-violet-200'>
                  {locale === 'en' ? 'Privacy Policy' : 'Datenschutzvorordnung'}
                </Link>
                <Link href={`/${locale}/legal/agb`} className='text-violet-300 text-md transition-all duration-300 hover:text-violet-200'>
                  {locale === 'en' ? 'Terms and Conditions' : 'AGB - Allgemeine Geschäftsbedingungen '}
                </Link>
              </div>
            </div>
          </div>
          <p className='text-center text-white pb-2'>&copy; No Copyright {currentYear}</p>
        </div>
      </div>
    </>
  )
}

export default Footer