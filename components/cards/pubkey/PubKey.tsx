'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';

import { PubKeyDialog } from './Dialog';
import { QrReader } from 'react-qr-reader';
import { AiOutlineQrcode } from 'react-icons/ai';
import { Button } from '@/components/ui/button';


type TPubKey = {
  translate: any;
  pubKey: string;
  setPubKey: React.Dispatch<React.SetStateAction<string>>;
  pubkeyErr: string;
}


const PubKey = ({ translate, pubKey, setPubKey, pubkeyErr }: TPubKey) => {
  const [genpubkey, setgenpubkey] = useState('')
  const [openQrReader, setOpenQrReader] = useState(false)

  useEffect(() => {
    setPubKey(genpubkey)
  }, [genpubkey])

  const handleScan = async (data: any | null) => {
    if (data && data.text) {
      setgenpubkey(data.text)
      setOpenQrReader(false);
    }
  }

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
            {!openQrReader ? (
              <div className='flex flex-row gap-1'>
                <Input value={genpubkey} className={`text-white text-lg focus:shadow-white focus:shadow-md ${pubKey && (pubkeyErr
                  ? 'border-red-500'
                  : 'border-green-500')}`}
                  onChange={(e) => { setgenpubkey(e.target.value) }}
                  placeholder='Your Public Key'
                />
                <button type='button' onClick={() => setOpenQrReader(true)}>
                  <AiOutlineQrcode className='ml-2 text-xl text-white' />
                </button>
              </div>
            ) : (
              <div className='flex flex-col  mb-4 justify-center items-center'>
                <QrReader
                  className='w-[250px] h-[170px]  rounded-md'
                  constraints={{ facingMode: "exact" }}
                  scanDelay={30}
                  onResult={(data: any) => handleScan(data)}
                />
                <Button className='mt-10 pt-4' onClick={() => setOpenQrReader(false)}>Cancel</Button>
              </div>
            )
            }
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