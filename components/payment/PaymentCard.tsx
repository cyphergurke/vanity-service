"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Paypal from "./PaypalPayment"
import { useRouter } from "next/navigation"
import LnPayment from "./LnPayment"
import OnChainPayment from "./OnChainPayment"
import axios from "axios"
import { useEffect } from "react"
import React from "react"
import { useLocale, useTranslations } from "next-intl"
import Details from "./Details"
import { IOrder } from "@/lib/actions/order.model"

type TPaymentCard = {
    paymentstr: string | undefined,
    orderstr: string,
}

const PaymentCard = ({ paymentstr, orderstr }: TPaymentCard) => {
    const payment = paymentstr && JSON.parse(paymentstr)
    const order: IOrder = JSON.parse(orderstr)
    const router = useRouter()
    const locale = useLocale()

    const c = useTranslations('Checkout')

    useEffect(() => {
        const checkPaymentStatus = async () => {
            const btcpayment = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${order._id}`
            );

            if (btcpayment.data.chargeInfo.status === 'paid' && order.price === 0) {
                router.push(`${locale}/order/paid/${order._id}`);
                clearInterval(checkPaymentInterval);
            }
        };

        const checkPaymentInterval = setInterval(checkPaymentStatus, 4000);
        return () => {
            clearInterval(checkPaymentInterval);
        };
    }, [order._id, locale, router]);

    useEffect(() => {
        if (payment && payment.status === 'paid' && order.price > 0) {
            router.push(`${locale}/order/invoice/${order._id}`);
            return;
        }
        if (payment && payment.status === 'paid' && order.price === 0) {
            router.push(`${locale}/order/paid/${order._id}`);
            return;
        }
    }, [payment, order._id, locale, router]);


    return (
        <>
            {paymentstr && orderstr && payment.status !== "paid" ? (
                <Tabs defaultValue="lightning" className="md:w-1/3 w-full m-5" >
                    <p className="text-2xl text-white text-center pb-10">{c('title')}</p>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="lightning">Lightning</TabsTrigger>
                        <TabsTrigger value="onchain">Onchain</TabsTrigger>
                        <TabsTrigger value="paypal">Paypal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lightning">
                        <Card>
                            <CardHeader>
                                <CardTitle>{c('lnTitle')}</CardTitle>
                                <CardDescription>
                                    {c('lnSubTitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Details order={order} />
                                {payment && payment.lightning_invoice &&
                                    <LnPayment invoice={payment.lightning_invoice} />
                                }
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="onchain">
                        <Card>
                            <CardHeader>
                                <CardTitle>{c('onChainTitle')}</CardTitle>
                                <CardDescription>
                                    {c('onChainSubTitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Details order={order} />
                                {payment && payment.lightning_invoice &&
                                    <OnChainPayment invoice={payment} />
                                }
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="paypal">
                        <Card>
                            <CardHeader>
                                <CardTitle>{c('paypalTitle')}</CardTitle>
                                <CardDescription>
                                    {c('paypalSubTitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Details order={order} />
                                {order &&
                                    <Paypal order={order} />
                                }
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs >
            ) : (
                <div className="spinner w-[60px] h-[60px]  mx-auto my-auto mt-32"></div>
            )}
        </>
    )
}

export default PaymentCard