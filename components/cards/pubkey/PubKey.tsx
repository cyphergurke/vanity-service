'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';

import { PubKeyDialog } from './Dialog';


type TPubKey = {
  translate: any;
  pubKey: string;
  setPubKey: React.Dispatch<React.SetStateAction<string>>;
  pubkeyErr: string;
}


const PubKey = ({ translate, pubKey, setPubKey, pubkeyErr }: TPubKey) => {
  const [genpubkey, setgenpubkey] = useState('')

  useEffect(() => {
    setPubKey(genpubkey)
  }, [genpubkey])

  return (
    < >
      <p className='text-white text-center text-2xl'>
        {translate.pubkeyTitle}
      </p>
      <div className='mt-10'>
        <Card className="mx-auto w-[80%] lg:w-[400px]
        bg-blue-gradient  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground">
          <CardHeader>
            <CardTitle className="text-slate-300 text-center">
              {translate.prefixTitle}
            </CardTitle>
            <CardDescription className=" text-white">
              {translate.pubkeyText}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input value={genpubkey} className={`text-white text-lg focus:shadow-white focus:shadow-md ${pubKey && (pubkeyErr
              ? 'border-red-500'
              : 'border-green-500')}`} 
              onChange={(e) => { setgenpubkey(e.target.value) }} 
              placeholder='Your Public Key'
              />
            {pubkeyErr
              ? <p className='text-red-500'>{pubkeyErr}</p>
              : ''}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className='pt-5'>
            <PubKeyDialog translate={translate} setPubKey={setgenpubkey} pubKey={genpubkey} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default PubKey