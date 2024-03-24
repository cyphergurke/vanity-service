'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { validatePublicKey } from 'unchained-bitcoin';
import { PubKeyDialog } from './Dialog';


type TPubKey = {
  translate: any;
  pubKey: string;
  setPubKey: React.Dispatch<React.SetStateAction<string>>;
  pubkeyErr: string;
}


const PubKey = ({ translate, pubKey, setPubKey, pubkeyErr }: TPubKey) => {




  return (
    < >
      <h2 className='text-white text-center text-2xl'>
        {translate.pubkeyTitle}
      </h2>
      <div className='mt-10'>
        <Card className="mx-auto w-[80%]
         bg-black  border-none transition-all  duration-700
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
            <Input className={`text-white text-lg ${pubKey && (pubkeyErr
              ? 'border-red-500'
              : 'border-green-500')}`} onChange={(e) => setPubKey(e.target.value)} />
            {pubkeyErr
              ? <p className='text-red-500'>{pubkeyErr}</p>
              : ''}

          </CardContent>
          <CardFooter className="flex justify-center">
            <PubKeyDialog />
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default PubKey