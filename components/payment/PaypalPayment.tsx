"use client"

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Paypal = ({ order }: any) => {

    const router = useRouter()
    const pathname = usePathname()
    const paypalCreateOrder = async () => {
        try {
            const postData = {
                orderId: order._id,
                order_price: order.price
            }
            const response = await axios.post('/api/paypal/createorder', postData)
            return response.data.id
        } catch (err) {
            return null
        }
    }
    const paypalCaptureOrder = async (data: any) => {
        try {
            const response = await axios.post('/api/paypal/captureorder', {
                _id: order._id,
                orderID: data.orderID,
                order_price: data.order_price
            })
            if (response.data.message === "COMPLETED") {
                const langpath = pathname.slice(0, 3)
                router.push(`${langpath}/order/paid/${order._id}`)
                return true
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div>
            {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && order ? (
                <PayPalScriptProvider
                    options={{
                        'clientId': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                        'currency': 'USD',
                        'intent': 'capture'
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50
                        }}
                        createOrder={async () => {
                            const order_id = await paypalCreateOrder()
                            return order_id + ''
                        }}
                        onApprove={async (data) => {
                            await paypalCaptureOrder(data)
                        }}
                    />
                </PayPalScriptProvider>
            ):(
                <div className="spinner mx-auto my-auto"></div>
            )}
        </div>
    )
}

export default Paypal