"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import QrDialog from '../payment/QrDialog'
import { IOrder } from '@/lib/actions/order.model'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

const OrderStatus = ({ orderstr }: any) => {
    const [progress, setProgress] = useState([])
    const [order, setOrder] = useState<IOrder>(JSON.parse(orderstr))

    const locale = useLocale()
    const s = useTranslations('Status')

    useEffect(() => {
        const checkProgress = async () => {
            const vanityProgress = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${order._id}`
            );
            if (vanityProgress.data.status === 'COMPUTING' && vanityProgress.data.progress) {
                setProgress(vanityProgress.data.progress);
                setOrder(vanityProgress.data.order);
            } else if (vanityProgress.data.status === 'COMPLETED') {
                setProgress(vanityProgress.data.progress);
                clearInterval(checkProgressInterval);
            }
        };

        const checkProgressInterval = setInterval(checkProgress, 6000);

        return () => {
            clearInterval(checkProgressInterval);
        };
    }, [order._id]);

    return (
        <div className='w-[90%] md:w-2/3 lg:w-1/2  bg-blue-gradient text-white p-4 rounded-lg shadow-lg shadow-black' >
            <p className='p-2 text-xl'>
                {s('thankYou')}
            </p>
            <p className='flex justify-between p-2 '>
                <b className="whitespace-nowrap pr-1">Orderid: </b>
                <span className="break-all text-right flex flex-col-reverse"> {order._id}</span>
            </p>
            <p className='flex justify-between p-2 break-words text-wrap'>
                <b>Vanity Address Prefix: </b> {order.addrtype + order.prefixstr}</p>
            <p className='flex justify-between p-2 break-words text-wrap'>
                <b>Status: </b>
                {order.status === "PENDING" && <span className='text-red'>Noch nicht bezahlt</span>}
                {(order.status === "PAID" || order.status === "QUEUED") && "Berechnung ist in der Warteschlange"}
                {order.status === "COMPUTING" && "Vanity Adresse wird berechnet"}
                {order.status === "COMPLETED" && "Vanity Adresse berechnet"}
            </p>
            {progress && !order.partialPriv && (
                <p className='flex justify-between p-2 break-words text-wrap'>
                    <b>Progress: </b>
                    {progress ? progress[0] : ''}
                    {progress ? progress[1] : ''}
                    {progress ? progress[2] : ''}
                    {progress ? progress[3] : ''}
                    {progress ? progress[4] : ''}
                </p>
            )}
            <p className='flex justify-between p-2 '>
                <b className="whitespace-nowrap pr-1">Public Key: </b>
                <span className="break-all text-right flex flex-col-reverse"> {order.publickey}</span>
            </p>
            <p className='flex justify-between p-2 '>
                <b className="whitespace-nowrap pr-1">partial Private Key: </b>
                <span className="break-all text-right flex flex-col-reverse">
                    {order.partialPriv}
                </span>
            </p>
            <p className='flex justify-between p-2 '>
                <b className="whitespace-nowrap pr-1">vanity address: </b>
                <span className="break-all text-right flex flex-col-reverse"> {order.vanityAddr}</span>
            </p>
            <div className=" flex flex-col md:flex-row  gap-2 justify-center items-center mt-6">
                <Link href={`/${locale}/order/invoice/${order._id}`}>
                    <Button variant="secondary">
                        {s('createInvoice')}
                    </Button>
                </Link>
                {order.partialPriv &&
                    <>
                        <QrDialog dataUrl={order.partialPriv} />
                        <Link href={`https://vanity-split-key-merge.bitcoin-uni.de/${order.vanityAddr}/${order.partialPriv}`}>
                            <Button className='bg-green-700' >
                                {s('mergePartialKeys')}
                            </Button>
                        </Link>
                    </>
                }
                {order.status === "PENDING" &&
                    <Link href={`/${locale}/order/checkout/${order._id}`}>
                        <Button className='bg-green-700'>
                            {s('payNow')}
                        </Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default OrderStatus
