"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LabelInputContainer } from "@/components/form/Contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateInvoicePDF } from "@/lib/invoice";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";


type invoiceFormT = {
    name: string,
    address: string,
    postalCode: string,
    city: string,
    email: string,
    vatId: string
}



const B2BInvoice = ({ order }: any) => {
    const i = useTranslations("Invoice")
    const locale = useLocale()

    const invoiceSchema = z.object({
        name: z.string().min(1, i('form.nameZod')),
        address: z.string().min(1, i('form.addressZod')),
        postalCode: z.string().min(1, i('form.postalCodeZod')),
        city: z.string().min(1, i('form.cityZod')),
        email: z.string().email(i('form.emailZodUnvalid')).min(1, i('form.emailZodRequired')),
        vatId: z.string().optional()
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            name: "",
            address: "",
            postalCode: "",
            city: "",
            email: "",
            vatId: "",
        }
    });



    const onSubmit = (data: invoiceFormT) => {
        generateInvoicePDF({
            customerName: data.name,
            customerAddress: data.address,
            customerPostalCodeAndCity: `${data.postalCode} ${data.city}`,
            customerEmail: data.email,
            customerVatId: data.vatId,
            invoiceNumber: order._id.slice(0, 7),
            invoiceDate: new Date(),
            serviceDate: new Date(),
            serviceDescription: "data.serviceDescription",
            netAmount: order.price,
            vatAmount: order.price * 0.19,
            grossAmount: order.price + (order.price * 0.19),
        });
        reset();
    };

    return (
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            < div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4" >
                <LabelInputContainer>
                    <Label htmlFor="name">{i('form.name')}</Label>
                    <Input id="name" placeholder={i('form.namePlaceholder')} type="text" {...register("name")} />
                    {errors.name && typeof errors.name.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.name.message}</p>
                    )}
                </LabelInputContainer>
            </div >

            < LabelInputContainer className="mb-4" >
                <Label htmlFor="address">{i('form.address')}</Label>
                <Input
                    id="address"
                    placeholder={i('form.addressPlaceholder')}
                    type="text"
                    {...register("address")}
                />
                {
                    errors.address && typeof errors.address.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.address.message}</p>
                    )
                }
            </LabelInputContainer >

            < div className="flex space-x-2 mb-4" >
                <LabelInputContainer className="flex-1">
                    <Label htmlFor="postalCode">{i('form.postalCode')}</Label>
                    <Input
                        id="postalCode"
                        placeholder={i('form.postalCodePlaceholder')}
                        type="text"
                        {...register("postalCode")}
                    />
                    {errors.postalCode && typeof errors.postalCode.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.postalCode.message}</p>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="flex-1">
                    <Label htmlFor="city">{i('form.city')}</Label>
                    <Input
                        id="city"
                        placeholder={i('form.cityPlaceholder')}
                        type="text"
                        {...register("city")}
                    />
                    {errors.city && typeof errors.city.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.city.message}</p>
                    )}
                </LabelInputContainer>
            </div >

            < LabelInputContainer className="mb-4" >
                <Label htmlFor="email">{i('form.email')}</Label>
                <Input id="email" placeholder={i('form.emailPlaceholder')} type="email" {...register("email")} />
                {
                    errors.email && typeof errors.email.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.email.message}</p>
                    )
                }
            </LabelInputContainer >

            < LabelInputContainer className="mb-4" >
                <Label htmlFor="vatId">{i('form.vatId') + " (optional)"}</Label>
                <Input id="vatId" placeholder={i('form.vatIdPlaceholder')} type="text" {...register("vatId")} />
                {
                    errors.vatId && typeof errors.vatId.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.vatId.message}</p>
                    )
                }
            </LabelInputContainer >

            <div className="flex justify-between">
                <Button type="submit" className="btn btn-primary" >{i('submitbtn')}</Button >
                <Link href={`/${locale}/order/status/${order._id}`}>
                    <Button className="bg-green-700" >{i('privat.continuebtn')}</Button >
                </Link>

            </div>
        </form >
    );
};

export default B2BInvoice; 
