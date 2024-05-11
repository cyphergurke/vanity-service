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
import { usePathname, useRouter } from "next/navigation"
import OrderInfo from "./OrderInfo"
import LnPayment from "./LnPayment"
import OnChainPayment from "./OnChainPayment"
import axios from "axios"
import { useEffect } from "react"

type TPaymentCard = {
    paymentstr: string | undefined,
    orderstr: string,
}

const PaymentCard = ({ paymentstr, orderstr }: TPaymentCard) => {
    const payment = paymentstr && JSON.parse(paymentstr)
    const order = JSON.parse(orderstr)
    const router = useRouter()
    const pathname = usePathname()
    const langpath = pathname.slice(0, 3)

    const checkPaymentStatus = async () => {
        const checkPaymentInterval = setInterval(async () => {
            const btcpayment = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${order._id}`)
            if (btcpayment.data.chargeInfo.status === "paid") {
                router.push(`${langpath}/order/paid/${order._id}`)
                clearInterval(checkPaymentInterval)
            }
        }, 4000)
    }

    useEffect(() => {
        if (payment && payment.status === "paid") {
            router.push(`${langpath}/order/paid/${order._id}`)
            return
        }
        checkPaymentStatus()
    }, [payment])


    return (
        <>
            {paymentstr && orderstr && payment.status !== "paid" ? (
                <Tabs defaultValue="lightning" className="md:w-1/3 w-full m-5" >
                    <p className="text-2xl text-white text-center pb-10">Choose Payment Method</p>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="lightning">Lightning</TabsTrigger>
                        <TabsTrigger value="onchain">Onchain</TabsTrigger>
                        <TabsTrigger value="paypal">Paypal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lightning">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pay with Lightning</CardTitle>
                                <CardDescription>
                                    Scan the Invoice with your Lightning Wallet!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
                                <CardTitle>Bitcoin OnChain</CardTitle>
                                <CardDescription>
                                    Scan the QRCode with your Bitcoin Wallet and pay the invoice!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
                                <CardTitle>Paypal</CardTitle>
                                <CardDescription>
                                    <OrderInfo order={order} />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
                <div className="spinner mx-auto my-auto mt-32"></div>
        )}
        </>
    )
}

export default PaymentCard