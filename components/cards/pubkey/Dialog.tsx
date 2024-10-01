"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PubKeyAccordion } from "./PubKeyAccordion"
import { genKeypair } from "@/lib/keypair"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import * as QRCode from 'qrcode'
import Image from "next/image"
import Progress from "@/components/Progress"
import React from "react"

type TPubKeyDialog = {
  pubKey: string;
  translate: any;
  setPubKey: React.Dispatch<React.SetStateAction<string>>;
}

export function PubKeyDialog({ translate, setPubKey }: TPubKeyDialog) {
  const [entropy, setEntropy] = useState('Bitcoin Satoshi Nakamoto')
  const [keypair, setKeypair] = useState<any>() // <{ privkey: string, pubkey: string } | null>
  const [progress, setProgress] = useState<number>(0);
  const [generateKeypair, setGenerateKeypair] = useState(false)
  const targetProgress = 100;
  const [qrCodeURLs, setQRCodeURLs] = useState<{ privKeyQR?: string; pubKeyQR?: string }>({});
  const progressStep = 1;

  const generateCryptoEntropy = () => {
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      setEntropy((prev) => prev + array[0].toString(16));
    }
  };

  const handleMouseOver = (event: React.MouseEvent) => {
    if (progress < targetProgress) {
      const mouseEntropy = event.clientX.toString(16) + event.clientY.toString(16);
      setEntropy((prev) => prev + mouseEntropy);
      setProgress((prev) => Math.min(prev + progressStep, targetProgress));
      generateCryptoEntropy();
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (progress < targetProgress) {
      const touch = event.touches[0];
      const touchEntropy = touch.clientX.toString(16) + touch.clientY.toString(16);
      setEntropy((prev) => prev + touchEntropy);
      setProgress((prev) => Math.min(prev + progressStep, targetProgress));
      generateCryptoEntropy();
    }
  };


  const getNewKeyPair = async () => {
    const ecpair: any = await genKeypair(entropy)
    setKeypair(ecpair)
    const pubKeyQR = await QRCode.toDataURL(ecpair.pubKey)
    const privKeyQR = await QRCode.toDataURL(ecpair.privKey)
    setQRCodeURLs({ privKeyQR: privKeyQR, pubKeyQR: pubKeyQR })
  }

  useEffect(() => {
    if (progress >= 100) {
      getNewKeyPair()
    }
  }, [progress]);


  const copyText = async (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      // Todo: Add toast
    } catch (err: any) {
      alert(`Failed to copy text: ${err.message}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="focus:bg-slate-900 focus:text-white transition-all duration-300 hover:shadow-white hover:shadow-md  "
        >{translate.dialogBTN}</Button>
      </DialogTrigger>
      <DialogContent onTouchMove={handleTouchMove} onMouseOver={handleMouseOver} className="max-h-[98vh] overflow-auto max-w-[97vw] md:w-[50%] lg:w-[50%]" >
        <div className="max-w-full">
          <DialogHeader>
            <DialogTitle>{translate.dialogBTN}</DialogTitle>
            <DialogDescription>
              <PubKeyAccordion translate={translate} />
              {/* <WebcamCapture setEntropy={setEntropy} setProgress={setProgress}/> */}
            </DialogDescription>
          </DialogHeader>
          {generateKeypair && (
            <>
              {keypair ? (
                <div className="  gap-4 py-4 text-center">
                  <Label className="text-lg">
                    {translate.privateKey}
                  </Label>
                  <div className=" flex flex-col md:flex-row  lg:flex-row items-center justify-between">
                    {qrCodeURLs.privKeyQR &&
                      <Image src={qrCodeURLs.privKeyQR} alt={translate.privateKey} width={150} height={150} />
                    }
                    <p className="col-span-3 bg-gray-800 p-4 w-2/3 text-shadow-white
                   text-red-600 text-wrap break-words  cursor-pointer transition-all ease-in hover:bg-gray-900 shadow-gray-500
                   bottom-1 rounded-md active:shadow-gray-800 shadow-lg "
                      onClick={() => {
                        copyText(keypair && keypair?.privKey); toast("", {
                          description: translate.privateKeyCopyDescription
                        });
                      }}>
                      {keypair && keypair?.privKey}
                    </p>
                  </div>
                  <Label className="text-lg ">
                    {translate.publicKey}
                  </Label>
                  <div className=" flex flex-col md:flex-row  lg:flex-row items-center justify-between">
                    {qrCodeURLs.pubKeyQR &&
                      <Image src={qrCodeURLs.pubKeyQR} alt={translate.publicKey} width={150} height={150} />
                    }
                    <p className="col-span-3 bg-gray-800 p-4 w-2/3 text-shadow-white
                   text-green-600 text-wrap break-words  cursor-pointer transition-all ease-in hover:bg-gray-900 shadow-gray-500
                   bottom-1 rounded-md active:shadow-gray-800 shadow-lg "
                      onClick={() => {
                        copyText(keypair && keypair?.pubKey); toast("", {
                          description: translate.publicKeyCopyDescription
                        });
                      }}>
                      {keypair && keypair?.pubKey}
                    </p>
                  </div>
                  <p className="text-red-500">
                    {translate.securityHint}
                  </p>
                </div>
              ) : (
                <Progress translate={translate} progress={progress} targetProgress={targetProgress} />
              )}
            </>
          )}
          <DialogFooter className="flex flex-col md:flex-row lg:flex-row mt-4 mb-4">
            {generateKeypair ? (
              <>
                <Button
                  className="m-2"
                  onClick={() => { setProgress(0); setKeypair(null) }}>{translate.pubkeyRegenerate}</Button>
                <DialogTrigger asChild>
                  <Button
                    className="m-2"
                    disabled={progress !== 100}
                    onClick={() => setPubKey(keypair.pubKey)}
                  >
                    {translate.pubkeyTakethisPubKeyBTN}
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button className="m-2">
                    Okay
                  </Button>
                </DialogTrigger>
              </>
            ) : (
              <>
                <Button className="m-2" onClick={() => setGenerateKeypair(true)}>
                  {translate.keypairGenerateBTN}
                </Button>
                <DialogTrigger asChild>
                  <Button className="m-2">
                    Okay
                  </Button>
                </DialogTrigger>
              </>
            )}
          </DialogFooter>
        </div>
      </DialogContent >
    </Dialog >
  )
}
