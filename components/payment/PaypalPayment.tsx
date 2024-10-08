"use client"

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Paypal = ({ order }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const locale = useLocale()

    const paypalCreateOrder = async () => {
        try {
            const postData = {
                orderId: order._id,
                order_price: order.priceIncltaxes
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
                router.push(`${locale}/order/paid/${order._id}`)
                return true
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div>
            {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && (
                <PayPalScriptProvider
                    options={{
                        'clientId': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                        'currency': 'USD',
                        'intent': 'capture'
                    }}
                >
                    {isLoading && (
                        <div className="spinner w-[60px] h-[60px]  mx-auto my-auto"></div>
                    )}
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
                        onInit={() => {
                            setIsLoading(false);
                        }}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    )
}

export default Paypal