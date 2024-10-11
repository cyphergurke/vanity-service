"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { motion } from "framer-motion";
import LanguageToggle from "./LanguageToggle"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data"
import Image from "next/image";
import logo from '../../public/favicon/android-chrome-192x192.png'

export function MobileNavBar() {
    const [isVisible, setIsVisible] = useState(true);
    const [hasBackground, setHasBackground] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();

    // translation
    const h = useTranslations('Navigation');
    const translate = {
        home: h('home'),
        contact: h('contact'),
        faq: h('faq'),
        guide: h('guide'),
    };
    const translatedNavItems = navItems(translate)

    // manage header background
    const controlNavbar = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY === 0) {
                setIsVisible(true);
                setHasBackground(false);
            } else if (window.scrollY < lastScrollY) {
                setIsVisible(true);
                setHasBackground(true);
            } else {
                setIsVisible(false);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);


    return (
        <motion.div
            className={`fixed top-0 right-0 w-full h-16 z-50 flex items-center transition-all duration-1000
                ${hasBackground ? "bg-black/50 backdrop-blur-md h-16" : "bg-transparent "}`}
            initial={{ y: "-100%" }}
            animate={{ y: isVisible ? "0%" : "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="ml-4 flex flex-row items-center gap-2">
                <Link href="/" aria-label='Home - Bitcoin Uni Vanity Service'>
                    <Image
                        src={logo}
                        alt=""
                        width={50} height={50}
                        className='rounded-full transition-all duration-500 hover:opacity-70 '
                    />
                    <p className=' hidden lg:block font-semibold text-xl text-white'>Bitcoin Uni - Vanity Service</p>
                </Link>
            </div>
            <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <SheetTrigger className="right-2 fixed ">
                    <span
                        className="text-white text-2xl p-4 hover:bg-default">
                        {"<"}
                    </span>
                </SheetTrigger>
                <SheetContent>
                    <div className="mb-5 ml-6">
                        <LanguageToggle />
                    </div>
                    <SheetHeader>
                        <SheetTitle>
                            <Link
                                href={`/${locale}`}
                                onClick={() => setIsOpen(false)}
                                className="text-black ">
                                Vanity Address Generator
                            </Link>
                        </SheetTitle>
                        <SheetDescription>
                            A of Bitcoin Uni Service
                        </SheetDescription>
                    </SheetHeader>
                    <div className=" flex flex-col gap-y-10  text-center w-full  pt-20">
                        {translatedNavItems.map((navItem: any, idx: number) => (
                            <Link
                                key={`link=${idx}`}
                                href={`/${locale}${navItem.link}`}
                                className={cn(
                                    "relative items-center flex space-x-1"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="text-black text-lg !cursor-pointer">{navItem.name}</span>
                            </Link>
                        ))}
                    </div>
                    <SheetFooter>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </motion.div>
    )
}
