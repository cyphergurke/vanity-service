'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { validatePublicKey } from 'unchained-bitcoin';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';


type TContact = {
    translate: any;
    email: any;
    lnurl: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setLnUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Contact = ({ email, lnurl, setEmail, setLnUrl, translate }: TContact) => {
    const [option, setOption] = useState<'email' | 'lnurl'>()



    return (
        < >
            <h2 className='text-white text-2xl'>
                {translate.contactTitle}
            </h2>
            <div className='mt-10'>
                <Card className="mx-auto w-[80%]
         bg-black  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-slate-300 text-center">

                        </CardTitle>
                        <CardDescription className=" text-white">
                            {translate.contactText}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex gap-10 justify-center mb-4'>
                            <Button color='secondary' disabled={option === 'email'} onClick={() => setOption('email')}>
                                Email
                            </Button>
                            <Button color='secondary' disabled={option === 'lnurl'} onClick={() => setOption('lnurl')}>
                                LNURL
                            </Button>
                        </div>
                        {option && (
                            <div className='flex flex-row items-center'>
                                <p className='text-white pr-1'>{option === 'email' ? 'Email: ' : ''}</p>
                                <p className='text-white pr-1'>{option === 'lnurl' ? 'LNURL: ' : ''}</p>
                                <Input
                                    type="email"
                                    className={`text-white text-lg `}
                                    onChange={(e) => { option === 'email' ? setEmail(e.target.value) : setLnUrl(e.target.value) }} />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center">

                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Contact