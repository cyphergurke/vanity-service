import { getOrderById } from "@/lib/actions/order.action";
import Order from "@/lib/actions/order.model";
import { connectToDatabase } from "@/lib/mongoose";
import axios from "axios";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        const getOrder = async () => {
            const order = await getOrderById({ orderId: id })
            return order
        }
        const order = await getOrder()

        if (order.status !== "PENDING" || order.payment?.opennode?.status === "paid") {
            return Response.json({ status: order.status, chargeInfo: { status: "paid" }, progress: order.progress });
        } else if(order.payment) {
            const options = {
                method: 'GET',
                url: `https://api.opennode.com/v2/charge/${order.payment.opennode.id}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: process.env.OPENNODE_KEY,
                }
            };
            const chargeInfo = await axios.request(options)
                .then(function (response) {
                    return response.data.data
                })
                .catch(function (error) {
                    console.error(error);
                });
            if (chargeInfo.status === "paid") {
                connectToDatabase()
                await Order.findOneAndUpdate({ _id: id }, {
                    $set: {
                        status: 'PAID',
                        payment: {
                            opennode: {
                                status: chargeInfo.status
                            }
                        }
                    }
                })
            }
            return Response.json({ status: order.status, chargeInfo: { status: chargeInfo.status } });
        }
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Failed to get ChargeInfo', message: error.message });
    }
}
