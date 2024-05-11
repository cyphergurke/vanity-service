import paypal from '@paypal/checkout-server-sdk'
import client from '@/lib/paypal';
import { NextRequest } from 'next/server';
import { getOrderByIdAndUpdate } from '@/lib/actions/order.action';

export async function POST(req: NextRequest) {
    
    try {
        const data: any = await req.json();
        const request = new paypal.orders.OrdersCaptureRequest(data.orderID)
        const emty: any = {}
        request.requestBody(emty)
        const paypalClient = client()
        const response = await paypalClient.execute(request);
        await getOrderByIdAndUpdate({_id: data._id, updateData: {status: 'PAID', payment: {txid: data.orderID}}}) 
        return Response.json({ message: response.result.status });
    } catch (error) {
        return Response.json({ error: 'Failed to capture PayPal order' });
    }
}
