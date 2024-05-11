"use client"

import React, { useEffect, useState } from 'react'
import QRCode from "qrcode"
import Image from 'next/image'

const OnChainPayment = ({ invoice }: any) => {
    const [invoiceQR, setInvoiceQR] = useState<string | null>(null)

    const genInvoiceQRCodes = async () => {
        if (!invoice) return

        const request = `${invoice.uri}`
        const invoiceQrCode = await QRCode.toDataURL(request)
        setInvoiceQR(invoiceQrCode)
    }

    useEffect(() => {
        if (!invoice) return
        genInvoiceQRCodes()
    }, [invoice])
    return (
        <div className='flex flex-col text-center justify-center items-center'>
            {invoiceQR ? (
                <Image src={invoiceQR} alt="lnInvoice" width={350} height={350} />
            ):(
                <div className="spinner mx-auto my-auto"></div>
            )}
        </div>
    )
}

export default OnChainPayment