'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

import { Button } from '../ui/button';


type TContact = {
    translate: any;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setLnUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Contact = ({ setEmail, setLnUrl, translate }: TContact) => {
    const [option, setOption] = useState<'email' | 'lnurl'>()



    return (
        < >
            <h2 className='text-white text-center text-2xl'>
                {translate.contactTitle}
            </h2>
            <div className='mt-10'>
                <Card className="mx-auto w-[80%] lg:w-[400px]
                    bg-blue-gradient border-none transition-all  duration-700
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
                            <Button
                                className="focus:bg-slate-900 focus:text-white  shadow-inherit transition-all duration-300 hover:shadow-white hover:shadow-md  "
                                variant='outline'
                                disabled={option === 'email'}
                                onClick={() => setOption('email')}>
                                Email
                            </Button>
                            <Button
                                className="focus:bg-slate-900 focus:text-white  shadow-inherit transition-all duration-300 hover:shadow-white hover:shadow-md  "
                                variant="outline"
                                disabled={option === 'lnurl'}
                                onClick={() => setOption('lnurl')}>
                                LNURL
                            </Button>
                        </div>
                        {option && (
                            <div className='flex flex-row items-center'>
                                <p className='text-white pr-1'>{option === 'email' ? 'Email: ' : ''}</p>
                                <p className='text-white pr-1'>{option === 'lnurl' ? 'LNURL: ' : ''}</p>
                                <Input
                                    type="email"
                                    color='primary'
                                    disabled={option === 'lnurl'}
                                    placeholder={option === 'lnurl' ? 'LNURL is not available atm ' : 'satoshin@gmx.de'}
                                    className={`text-white text-lg bg-transparent `}
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