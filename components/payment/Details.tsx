import { IOrder } from '@/lib/actions/order.model'
import { useTranslations } from 'next-intl'
import React from 'react'

const Details = ({ order }: { order: IOrder }) => {
    const c = useTranslations('Checkout')
    return (
        <div className=''>
            <p className="flex justify-between">
                <strong>Order ID:</strong> {order._id}
            </p>
            <p className="flex justify-between">
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="flex justify-between">
                <strong>{c('price')}:</strong> {order.price}€
            </p>
            <p className="flex justify-between">
                <strong>{c('tax')}:</strong> {order.price * 0.19}€
            </p>
            <p className="flex justify-between">
                <strong>{c('amount')}:</strong> {order.price + order.price * 0.19}€
            </p>
        </div>
    )
}

export default Details
