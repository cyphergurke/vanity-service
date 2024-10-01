"use client"

import React, { useState } from 'react'
import * as QRCode from 'qrcode'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';

const QrDialog = ({ dataUrl }: { dataUrl: string | null }) => {
    const [qrCodeimg, setQrCodeimg] = useState<string>()

    const createQrCode = async (qrData: string | null) => {
        if (!qrData) return
        const qrCode = await QRCode.toDataURL(qrData)
        setQrCodeimg(qrCode)
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={'secondary'}
                        onClick={() => createQrCode(dataUrl)}
                        className="  "
                    >Show Partial Key as QRCode</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[98vh] overflow-auto max-w-[97vw] md:w-[50%] lg:w-[50%]" >
                    <div className="flex flex-col max-w-full justify-center items-center">
                        <DialogHeader>
                            <DialogTitle>Partial Key as QRCode</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        {qrCodeimg &&
                            <Image alt="Partial Key as QR Code" src={qrCodeimg} width={400} height={400} className='' />
                        }

                        <DialogFooter className="flex flex-col md:flex-row lg:flex-row mt-4 mb-4">

                            <DialogTrigger asChild>
                                <Button className="m-2">
                                    Okay
                                </Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </div>
                </DialogContent >
            </Dialog >
        </div>
    )
}

export default QrDialog
