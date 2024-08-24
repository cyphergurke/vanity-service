import React, { useEffect, useState } from 'react'
import Image from "next/image"
import QRCode from "qrcode"
import { calculateRestTime } from '@/scripts/convertTimestamp'
import { Button } from '../ui/button'

const LnPayment = ({ invoice }: any) => {
    const [invoiceQR, setInvoiceQR] = useState<string | null>(null)
    const [restTime, setRestTime] = useState(calculateRestTime(invoice.expires_at));
    const [invoiceStr, setInvoiceStr] = useState('')

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

    const copyText = async (text: string) => {
        try {
          navigator.clipboard.writeText(text);
        } catch (err: any) {
          alert(`Failed to copy text: ${err.message}`);
        }
      };

    return (
        <div className='flex flex-col text-center justify-center items-center'>
            {invoiceQR ? (
                <>
                    <Image src={invoiceQR} alt="lnInvoice" width={350} height={350} />
                    <p className='text-green-700 text-xl'>{restTime && 'valid until: ' + restTime.minutes + 'm ' + restTime.seconds + 's'}</p>
                    <Button onClick={() => copyText(invoiceStr)} >Copy Invoice</Button>
                </>
            ) : (
                <div className="spinner mx-auto my-auto"></div>
            )}
        </div>
    )
}

export default LnPayment