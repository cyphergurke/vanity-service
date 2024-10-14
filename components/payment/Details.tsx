"use client"

import { IOrder, IPayment } from '@/lib/actions/order.model'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

const Details = ({ order, payment }: { order: IOrder, payment?: IPayment }) => {
    const [dateTime, setDateTime] = useState<{ date: string; time: string }>({
        date: '',
        time: '',
    });
    const c = useTranslations('Checkout')
    console.log(payment)

    useEffect(() => {
        const date = new Date(order.createdAt).toLocaleDateString();
        const time = new Date(order.createdAt).toLocaleTimeString();
        setDateTime({ date, time });
    }, [order.createdAt]);

    return (
        <div className=''>
            <p className="flex justify-between">
                <strong>Order ID:</strong> {order._id}
            </p>
            <p className="flex justify-between">
                <strong>Order Date:</strong> {dateTime.date} {dateTime.time}
            </p>
            <p className="flex justify-between">
                <strong>{c('price')}:</strong> {order.price}€
            </p>
            <p className="flex justify-between">
                <strong>{c('tax')}:</strong> {order.price * 0.19}€
            </p>
            <hr></hr>
            <p className="flex justify-between">
                <strong>{c('amount')}:</strong> {order.price + order.price * 0.19}€
                {payment && (
                    <>
                        {" | "}
                        {payment && JSON.stringify(payment.amount)} Sats
                    </>
                )}
            </p>

        </div>
    )
}

export default Details
