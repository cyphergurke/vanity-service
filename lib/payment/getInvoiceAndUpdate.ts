"use server"

import axios from "axios"
import Order from "../actions/order.model"
import { connectToDatabase } from "../mongoose"

export const updateOrderPayment = async (
    _id: string,
    opennode: any
) => {
    connectToDatabase()
    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: _id }, {
            $set: {
                payment: {
                    opennode: opennode
                }
            },
        })
        return updatedOrder
    } catch (err: any) {
        console.log(err.message)
    }
}

export const getBTCInvoice = async (id: string, amount: number) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://api.opennode.com/v1/charges',
            headers: {
                accept: 'application/json', 'Content-Type': 'application/json',
                authorization: process.env.OPENNODE_KEY
            },
            data: {
                amount: amount,
                currency: 'EUR',
                description: `Vanity Address Order: ${id}`,
                /*  customer_name: 'David Witten',
                 customer_email: 'david@bitcoin-uni.de', */
                order_id: id,
                callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${id}`,
                //  success_url: `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${id}`,
                auto_settle: true,
                split_to_btc_bps: 0,
                ttl: 30
            }
        };
        const response = await axios.request(options)
        if (response.data.data) {
            await updateOrderPayment(
                id,
                response.data.data
            )
        }
        return response.data.data
    } catch (error: any) {
        console.log(error.message)
    }
}