"use client"

import React, { useEffect, useRef, useState } from 'react'
import { GlobeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';

const LanguageToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const pathname = usePathname()



    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 120) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="  flex text-sm font-medium relative    rounded-full"
            >
                <GlobeIcon className='h-7 w-7' />
                <span className="sr-only">Toggle language</span>
            </button>
            <div
                className={cn(
                    'origin-top-right absolute right-0 mt-2 p-2 rounded-md shadow-lg bg-white dark:bg-black-100 dark:shadow-white-200 dark:shadow-md transition-all ',
                    isOpen
                        ? 'opacity-100 max-h-60 max-w-xs duration-700 ease-in-out'
                        : 'opacity-0  max-h-0 duration-700 ease-out overflow-hidden '
                )}
            >
                <div className="py-1">
                    <Link
                        href={`/en/${pathname}`}
                        className={cn(
                            "relative dark:text-white items-center  flex space-x-1 text-black    hover:text-neutral-500 dark:hover:bg-slate-800 rounded-md p-1"
                        )}
                        onClick={toggleDropdown}
                    >
                        english
                    </Link>
                    <Link
                        href={`/de/${pathname}`}
                        className={cn(
                            "relative dark:text-white items-center  flex space-x-1 text-black    hover:text-neutral-500 dark:hover:bg-slate-800 rounded-md p-1"
                        )}
                        onClick={toggleDropdown}
                    >
                        deutsch
                    </Link>
                </div>
            </div>
            {/*   )} */}
        </div>
    )
}

export default LanguageToggle
