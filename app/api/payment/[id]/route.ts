
import { getOrderById } from "@/lib/actions/order.action";
import Order, { IOrder } from "@/lib/actions/order.model";
import { connectToDatabase } from "@/lib/mongoose";
import axios from "axios";
import console from "console";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    const id = params.id
    try {
        const getOrder = async () => {
            const order = await getOrderById({ orderId: id })
            return order
        }
        const order = await getOrder()
        const updateOrderPayment = async (
            _id: string,
            payment_hash: string,
            payment_request: string,
            lnurl_response: string,
            checking_id: string
        ) => {
            connectToDatabase()
            try {
                const updatedOrder = await Order.findOneAndUpdate({ _id: _id }, {
                    $set: {
                        payment: {
                            lnInvoice: {
                                paymentHash: payment_hash,
                                paymentRequest: payment_request,
                                lnurlResponse: lnurl_response,
                                checkingId: checking_id,
                            }
                        }
                    },
                })
                return updatedOrder
            } catch (err: any) {
                console.log(err.message)
            }
        }

        const getLnInvoice = async (order: IOrder) => {
            if (order.payment) {
                return order.payment
            }

            const paymentData = {
                out: false,
                amount: order.priceIncltaxes,
                memo: `Your Vanity Address Booking: 
                Your ordered Prefix ${order.addrtype}${order.prefixstr},
                Your Public Key: ${order.publickey},
                The Bookingid:  ${order.id}`
            };

            try {
                const response: any = await axios.post('https://legend.lnbits.com/api/v1/payments', paymentData, {
                    headers: {
                        'X-Api-Key': process.env.LNBITS_APIKEY,
                        'Content-type': 'application/json'
                    }
                });
                await updateOrderPayment(
                    order._id,
                    response.data.payment_hash,
                    response.data.payment_request,
                    response.data.lnurl_response,
                    response.data.checking_id
                )
                return response
            } catch (error: any) {
                console.log(error)
            }

        }
        if (order) {
            const lninvoice = await getLnInvoice(order)
            return Response.json({ message: 'BookingHandler initialized successfully.', lninvoice: lninvoice });
        }

    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Failed to initialize BookingHandler.', message: error.message });
    }
}