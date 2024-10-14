
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LabelInputContainer } from "@/components/form/Contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { generateInvoicePDF } from "@/lib/invoice";
import { useTranslations } from "next-intl";

const B2BInvoice = ({ order }: any) => {
    const i = useTranslations("Invoice")

    const invoiceSchema = z.object({
        name: z.string().min(1, i('form.companyNameZod')),
        address: z.string().min(1, i('form.addressZod')),
        postalCode: z.string().min(1, i('form.zipCodeZod')),
        city: z.string().min(1, i('form.cityZod')),
        email: z.string().email(i('form.emailZodUnvalid')).min(1, i('form.emailZodRequired')),
        vatId: z.string().min(1, i('form.vatIdZod')),
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

    const onSubmit = (data: { name: string, address: string, postalCode: string, city: string, email: string, vatId: string }) => {
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
            <LabelInputContainer className="mb-4">
                <Label htmlFor="name">{i('form.companyName')}</Label>
                <Input id="name" placeholder={i('form.companyNamePlaceholder')} type="text" {...register("name")} />
                {errors.name && typeof errors.name.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.name.message}</p>
                )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4" >
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
                <Label htmlFor="vatId">{i('form.vatId')}</Label>
                <Input id="vatId" placeholder={i('form.vatIdPlaceholder')} type="text" {...register("vatId")} />
                {
                    errors.vatId && typeof errors.vatId.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.vatId.message}</p>
                    )
                }
            </LabelInputContainer >

            <Button type="submit"  >{i('submitbtn')}</Button >

        </form >
    );
};

export default B2BInvoice; 
