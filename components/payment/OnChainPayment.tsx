"use client"

import React, { useEffect, useState } from 'react'
import QRCode from "qrcode"
import Image from 'next/image'
import { Button } from '../ui/button'
import { copyText } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from 'sonner'

const OnChainPayment = ({ invoice }: any) => {
    const [invoiceQR, setInvoiceQR] = useState<string | null>(null)
    const f = useTranslations('Checkout')

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
                <>
                    <Image src={invoiceQR} alt="lnInvoice" width={350} height={350} />
                    <div className='flex flex-col gap-4'>
                        <Button onClick={() => {
                            copyText(invoice.uri); toast("", {
                                description: f("paymentRequestCopied")
                            })
                        }} >{f("copyPaymentRequest")}</Button>
                        <Link href={invoice.uri} >
                            <Button  >{f("openWallet")} </Button>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="spinner w-[60px] h-[60px]  mx-auto my-auto"></div>
            )}
        </div>
    )
}

export default OnChainPayment