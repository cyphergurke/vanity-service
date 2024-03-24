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
import { genKeypair } from "@/scripts/keypair"
import { useEffect, useState } from "react"

export function PubKeyDialog() {
  const [entropy, setEntropy] = useState('Bitcoin Satoshi Nakamoto')
  const [progress, setProgress] = useState<number>(0);
  const [keypair, setKeypair] = useState<{ privkey: string, pubkey: string } | null>()
  const targetProgress = 100;
  const progressStep = 2;

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

  useEffect(() => {
    if (progress >= targetProgress) {
    }
  }, [progress, entropy]);

  const getNewKeyPair = () => {
    console.log(entropy)
    const ecpair: any = genKeypair(entropy)
    setKeypair(ecpair)
  }

  return (
    <div
      onMouseOver={handleMouseOver}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Where to get the public key from?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Where to get the public key from?</DialogTitle>
            <DialogDescription>
              <PubKeyAccordion />
              Make changes to your profile here. Click save when you're done.
              <div
                style={{
                  height: '3px',
                  backgroundColor: '#4CAF50',
                  width: `${(progress / targetProgress) * 100}%`,
                }}
              ></div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Private Key
              </Label>
              <h2 className="col-span-3 text-red-600">{keypair?.privkey}</h2>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Public Key
              </Label>
              <h2 className="col-span-3 text-green-500">
                {keypair && keypair.pubkey}
                </h2>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => { setProgress(0) }}>Regenerate</Button>
            <Button disabled={progress !== 100} onClick={() => getNewKeyPair()}>Generate Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
