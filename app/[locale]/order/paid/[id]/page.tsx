"use server"

import PaymentSucceeded from '@/components/payment/PaymentSucceeded'
import { getOrderById } from '@/lib/actions/order.action'

const page = async ({ params }: { params: { id: string } }) => {
    const getOrder = async () => {
        const order = await getOrderById({ orderId: params.id })
        return order
    }
    const order = await getOrder()

    const orderObjStr = JSON.stringify(order);
    return (
        <div className='flex justify-center items-center'>
            <PaymentSucceeded orderstr={orderObjStr} />
        </div>
    )
}

export default page