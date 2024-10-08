"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import B2BInvoice from './B2BInvoice';
import B2CInvoice from './B2CInvoice';
import { useTranslations } from 'next-intl';



const Invoice = ({ orderstr }: any) => {
    const order = JSON.parse(orderstr)
    const i = useTranslations("Invoice")

    return (
        <Tabs defaultValue="privat" className="lg:w-1/3 md:w-2/3 w-full p-5 m-5" >
            <p className="text-2xl text-white text-center pb-10">{i('title')}</p>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="privat">Privat</TabsTrigger>
                <TabsTrigger value="b2b">B2B</TabsTrigger>
            </TabsList>
            <TabsContent value="privat">
                <Card>
                    <CardHeader>
                        <CardTitle>{i('privat.title')}</CardTitle>
                        <CardDescription>
                            {i('privat.subTitle')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <B2CInvoice order={order} />
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="b2b">
                <Card>
                    <CardHeader>
                        <CardTitle>{i('b2b.title')}</CardTitle>
                        <CardDescription>
                            {i('b2b.subTitle')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <B2BInvoice order={order} />

                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs >

    );
};

export default Invoice
