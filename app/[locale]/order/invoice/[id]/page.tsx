import Invoice from '@/components/invoice/Invoice'
import { getOrderById } from '@/lib/actions/order.action'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const getOrder = async () => {
        const order = await getOrderById({ orderId: params.id })
        return order
    }
    const order = await getOrder()

    const orderObjStr = JSON.stringify(order);
    return (
        <div className='flex justify-center items-center'>
            <Invoice orderstr={orderObjStr} />
        </div>
    )
}

export default page
