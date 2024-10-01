"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import B2BInvoice from './B2BInvoice';
import B2CInvoice from './B2CInvoice';



const Invoice = ({ orderstr }: any) => {
    const order = JSON.parse(orderstr)
    return (
        <Tabs defaultValue="privat" className="md:w-1/3 w-full m-5" >
            <p className="text-2xl text-white text-center pb-10">Generate Invoice</p>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="privat">Privat</TabsTrigger>
                <TabsTrigger value="b2b">B2B</TabsTrigger>
            </TabsList>
            <TabsContent value="privat">
                <Card>
                    <CardHeader>
                        <CardTitle>For Privat Customers</CardTitle>
                        <CardDescription>
                            As private Customer, you don't need the create an invoice
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
                        <CardTitle>B2B</CardTitle>
                        <CardDescription>

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
