import React, { useEffect, useState } from 'react'
import Image from "next/image"
import QRCode from "qrcode"
import { calculateRestTime } from '@/lib/convertTimestamp'
import { Button } from '../ui/button'
import { copyText } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from 'sonner'

declare global {
    interface Window {
        webln: any;
    }
}

const LnPayment = ({ invoice }: any) => {
    const [invoiceQR, setInvoiceQR] = useState<string | null>(null)
    const [restTime, setRestTime] = useState(calculateRestTime(invoice.expires_at));
    const [invoiceStr, setInvoiceStr] = useState('')
    const [weblnAvailable, setWeblnAvailable] = useState(false);

    const f = useTranslations('Checkout')

    const genInvoiceQRCodes = async () => {
        if (!invoice) return

        const request = `lightning:${invoice.payreq}`
        setInvoiceStr(request)
        const invoiceQrCode = await QRCode.toDataURL(request)
        setInvoiceQR(invoiceQrCode)
    }

    useEffect(() => {
        if (!invoice) return
        genInvoiceQRCodes()
        const timer = setInterval(() => {
            const restTime = calculateRestTime(invoice.expires_at)
            if (restTime.minutes === 0) {
                window.location.reload()
            }
            setRestTime(restTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [invoice])

    useEffect(() => {
        if (window.webln) {
            setWeblnAvailable(true);
        } else {
            console.error("WebLN is not available in this browser.");
        }
    }, []);


    return (
        <div className='flex flex-col text-center justify-center items-center'>
            {invoiceQR ? (
                <>
                    <Image src={invoiceQR} alt="lnInvoice" width={350} height={350} />
                    <p className='text-green-700 text-xl pb-4'>{restTime && 'valid until: ' + restTime.minutes + 'm ' + restTime.seconds + 's'}</p>
                    <div className='flex flex-col gap-4'>
                        <Button onClick={() => {
                            copyText(invoiceStr); toast("", {
                                description: f("paymentRequestCopied")
                            })
                        }} >{f("copyPaymentRequest")}</Button>
                        <Link href={invoiceStr} target="_blank">
                            <Button disabled={!weblnAvailable}   >{f("openWallet")}</Button>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="spinner mx-auto  w-[60px] h-[60px] my-auto"></div>
            )
            }
        </div >
    )
}

export default LnPayment