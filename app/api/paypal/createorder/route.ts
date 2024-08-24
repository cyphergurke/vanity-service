
import paypal from '@paypal/checkout-server-sdk'
import client from '@/lib/paypal';
import { NextRequest } from 'next/server';

export async function POST( req: NextRequest) {
  try {
    const data: any = await req.json();
     const PaypalClient = client()
     const request = new paypal.orders.OrdersCreateRequest()
     request.headers['Prefer'] = 'return=representation'
     request.requestBody({
       intent: 'CAPTURE',
       purchase_units: [
         {
           amount: {
             currency_code: 'USD',
             value: data.order_price,
           },
         },
       ],
     })
     const response = await PaypalClient.execute(request)
     return Response.json({ id: response.result.id });
  } catch (error) {
    return Response.json({ error: 'Failed to create PayPal order', status: 500 });
  }
}