"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import QrDialog from './QrDialog'

const PaymentSucceeded = ({ orderstr }: any) => {
    const [progress, setProgress] = useState([])
    const [order, setOrder] = useState(JSON.parse(orderstr))

    const router = useRouter()



    const checkProgress = async () => {
        const checkProgressInterval = setInterval(async () => {
            const vanityProgress = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${order._id}`)
            if (vanityProgress.data.status === "COMPUTING" && vanityProgress.data.progress) {
                setProgress(vanityProgress.data.progress)
                setOrder(vanityProgress.data.order)
            } else if (vanityProgress.data.status === "COMPLETED") {
                setProgress([])
                clearInterval(checkProgressInterval)
            }
        }, 6000)
    }

    useEffect(() => {
        checkProgress()
    }, [])


    return (
        <div className='w-[90%] md:w-2/3 lg:w-1/2  bg-blue-gradient text-white p-4 rounded-lg shadow-lg shadow-black' >
            <p className='p-2 text-xl'>
                Vielen Dank für Ihre Bestellung!
            </p>
            <p className='flex justify-between p-2 '>
                <b className="whitespace-nowrap pr-1">Orderid: </b>
                <span className="break-all text-right flex flex-col-reverse"> {order._id}</span>
            </p>
            <p className='flex justify-between p-2 break-words text-wrap'>
                <b>Vanity Address Prefix: </b> {order.addrtype + order.prefixstr}</p>
            <p className='flex justify-between p-2 break-words text-wrap'>
                <b>Status: </b>
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
            <div className="flex flex-col gap-2 justify-center items-center mt-6">
                {order.partialPriv &&
                    <QrDialog dataUrl={order.partialPriv} />
                }
                <Button variant="secondary" onClick={() => {
                    router.push(`https://vanity-split-key-merge.bitcoin-uni.de/${order.vanityAddr}/${order.partialPriv}`)
                }} >
                    Merge Partial Keys
                </Button>
            </div>
        </div>
    )
}

export default PaymentSucceeded
