"use server"

import PaymentCard from '@/components/payment/PaymentCard'
import { getOrderById } from '@/lib/actions/order.action'
import { getBTCInvoice } from '@/lib/payment/getInvoiceAndUpdate'
import { calculateRestTime } from '@/scripts/convertTimestamp'

const page = async ({ params }: { params: { id: string } }) => {
    const getOrder = async () => {
        const order = await getOrderById({ orderId: params.id })
        return order
    }
    const order = await getOrder()

    let opennodeInvoice;
    if (order && !order.payment && order.price !== 0 ) {
        opennodeInvoice = await getBTCInvoice(order._id, order.price);
    } else if (order && order.payment && order.payment.opennode && order.payment.opennode.status === 'unpaid') {
        const restTime = await calculateRestTime(order.payment.opennode.lightning_invoice.expires_at)
        opennodeInvoice = restTime.minutes > 0 ? order.payment.opennode : await getBTCInvoice(order._id, order.price);
    } else if (order.price === 0) {
        opennodeInvoice = {status: "paid"}
    }


    const orderObjStr = JSON.stringify(order);
    const payment = JSON.stringify(opennodeInvoice);

    return (
        <div className='flex justify-center items-center'>
                <PaymentCard paymentstr={payment} orderstr={orderObjStr} />
        </div>
    )
}

export default page
