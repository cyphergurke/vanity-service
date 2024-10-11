"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const locale = useLocale()
    const c = useTranslations('Cookie')

    useEffect(() => {
        const hasSeenTerms = localStorage.getItem('hasSeenTerms')
        if (!hasSeenTerms) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('hasSeenTerms', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {c('title')}
                        <Button variant="ghost" className='text-lg' onClick={() => setIsVisible(false)}>
                            x
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        {c('subTitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {c('privacyText')}
                    </p>
                    <p className='pt-2'>
                        {c('accepting')}:
                    </p>
                    <div className='flex flex-col justify-between text-blue-600 pb-4 text-sm gap-2'>
                        <Link href={`/${locale}/legal/agb`} className='hover:text-blue-900'>
                            {c('agb')}
                        </Link>
                        <Link href={`/${locale}/legal/dsgvo`} className='hover:text-blue-900'>
                            {c('dsgvo')}
                        </Link>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        onClick={handleAccept}
                        className="w-full">{c('btnTitle')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
