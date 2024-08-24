import { IOrder } from '@/lib/actions/order.model'
import React from 'react'

type OrderInfo = {
    order: IOrder
}

const OrderInfo = ({ order }: OrderInfo) => {
    return (
        <div><p>
            Orderid: {order._id}
        </p>
            <p>
                Order details:
                {order.addrtype}{order.prefixstr}
            </p>
            <p>
                Price:
                {order.price}
            </p></div>
    )
}

export default OrderInfo