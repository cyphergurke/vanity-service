'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';

import { PubKeyDialog } from './Dialog';
import QrDialog from './QrDialog';
import { useTranslations } from 'next-intl';


type TPubKey = {
  pubKey: string;
  setPubKey: React.Dispatch<React.SetStateAction<string>>;
  pubkeyErr: string | null;
}


const PubKey = ({ pubKey, setPubKey, pubkeyErr }: TPubKey) => {
  const [genpubkey, setgenpubkey] = useState('')

  useEffect(() => {
    setPubKey(genpubkey)
  }, [genpubkey])

  const f = useTranslations('Form')
  const translate = {
    pubkeyTitle: f('pubkey.title'),
    pubkeyText: f('pubkey.text'),
    dialogBTN: f('pubkey.dialog-btn'),
    aboutPubkeyTitle: f('pubkey.aboutpubkey-title'),
    aboutPubkeyText: f('pubkey.aboutpubkey-text'),
    chooseWalletTitle: f('pubkey.chooseWallet-title'),
    chooseWalletText: f('pubkey.chooseWallet-text'),
    exportPubkeyTitle: f('pubkey.exportpubkey-title'),
    exportPubkeyText: f('pubkey.exportpubkey-text'),
    keypairGenerateBTN: f('pubkey.keypair-generate-btn'),
    entropyText: f('pubkey.entropy-text'),
    securityHint: f('pubkey.security-hint'),
    privateKey: f('pubkey.private-key'),
    privateKeyCopyDescription: f('pubkey.private-key-copy-description'),
    publicKey: f('pubkey.public-key'),
    publicKeyCopyDescription: f('pubkey.public-key-copy-description'),
    pubkeyTakethisPubKeyBTN: f('pubkey.usepubkey-btn'),
    pubkeyRegenerate: f('pubkey.regenerate-btn'),
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

            </CardTitle>
            <CardDescription className=" text-white">
              {translate.pubkeyText}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row gap-1'>
              <Input value={genpubkey} className={`text-white text-lg focus:shadow-white focus:shadow-md ${pubKey && (pubkeyErr
                ? 'border-red-500'
                : 'border-green-500')}`}
                onChange={(e) => { setgenpubkey(e.target.value) }}
                placeholder='Your Public Key'
              />
              <QrDialog setgenpubkey={setgenpubkey} />
            </div>
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