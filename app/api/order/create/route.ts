import { NextRequest } from 'next/server';
import { calculatePrice } from '@/lib/pricecalculation';
import { createOrder } from '@/lib/actions/order.action';

export async function POST(req: NextRequest) {
    try {
        const data: any = await req.json();
        const prefixLenght = data.prefixstr.length;
        const price = await calculatePrice(data.addrtype, prefixLenght, data.casesensitive)

        const orderData = data;
        orderData.price = price.price
        orderData.priceIncltaxes = price.priceIncltaxes
        if (price.price === 0) {
            orderData.status = "PAID";
        }
        await createOrder(orderData)
        return Response.json({ message: "Order created Successfully", created: true });
    } catch (error) {
        return Response.json({ error: 'Failed to capture PayPal order', created: false });
    }
}
