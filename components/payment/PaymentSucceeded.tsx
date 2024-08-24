"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PaymentSucceeded = ({ orderstr }: any) => {
    const [progress, setProgress] = useState([])
    const [order, setOrder] = useState(JSON.parse(orderstr))

    const router = useRouter()

   /*  const parseMetrics = (elements: any) => {
        const values: any[] = [];
        console.log(elements[0])

        

        return values;
    };
 */

    const checkProgress = async () => {
        const checkProgressInterval = setInterval(async () => {
            const vanityProgress = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${order._id}`)
            if (vanityProgress.data.status === "COMPUTING" && vanityProgress.data.progress) {
                setProgress(vanityProgress.data.progress)
               /*  const newProgressData = parseMetrics(vanityProgress.data.progress)
                console.log(newProgressData) */
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

    useEffect(() => {
        if (order.vanityAddr && order.partialPriv) {
            router.push(`https://vanity-split-key-merge.bitcoin-uni.de/${order.vanityAddr}/${order.partialPriv}`)
        }
    }, [order])
    

    return (
        <div className=' w-[90%] md:w-2/3 lg:w-1/3 bg-blue-gradient text-white p-4 rounded-lg shadow-lg shadow-black' >
            <p className='p-2 text-xl'>
                Vielen Dank für Ihre Bestellung!
            </p>
            <p className='p-2 break-words text-wrap'>
                <b>Orderid: </b>{order._id}</p>
            <p className='p-2 break-words text-wrap'>
                <b>Vanity Address Prefix: </b> {order.addrtype + order.prefixstr}</p>
            <p className='p-2 break-words text-wrap'>
                <b>Status: </b>
                {order.status === ("PAID" || "QUEUED") && "Berechnung ist in der Warteschlange"}
                {order.status === "COMPUTING" && "Vanity Adresse wird berechnet"}
                {order.status === "COMPLETED" && "Vanity Adresse berechnet"}
            </p>
            {progress ? (<p className='p-2 break-words text-wrap'>
                <b>Progress: </b>
                {progress ? progress[0] : ''}
                {progress ? progress[1] : ''}
                {progress ? progress[2] : ''}
                {progress ? progress[3] : ''}
                {progress ? progress[4] : ''}
            </p>
            ) : (
                <div className="spinner mx-auto my-auto"></div>
            )}
            <p className='p-2 break-words text-wrap'>
                <b>PublicKey:
                </b> {order.publickey}</p>
            <p className='p-2 break-words text-wrap'>
                <b>partialPriv:
                </b> {order.partialPriv}</p>
            <p className='p-2 break-words text-wrap'>
                <b>vanity Address:
                </b> {order.vanityAddr}</p>
        </div>
    )
}

export default PaymentSucceeded
