"use client"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LabelInputContainer } from "@/components/form/Contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDate, getCurrentDate } from "@/lib/convertTimestamp";
import { Button } from "@/components/ui/button";

import jsPDF from "jspdf";

const invoiceSchema = z.object({
    name: z.string().min(1, "Der Name ist erforderlich"),
    address: z.string().min(1, "Die Anschrift ist erforderlich"),
    postalCode: z.string().min(1, "Die PLZ ist erforderlich"),
    city: z.string().min(1, "Die Stadt ist erforderlich"),
    email: z.string().email("Ungültige E-Mail-Adresse").min(1, "E-Mail-Adresse ist erforderlich"),
    vatId: z.string().min(1, "Die USt-IdNr. ist erforderlich"),
    serviceDescription: z.string().min(1, "Eine Leistungsbeschreibung ist erforderlich"),
    serviceDate: z.string().min(1, "Das Leistungsdatum ist erforderlich"),
});

const B2BInvoice = ({ order }: any) => {


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
            serviceDescription: `Bitcoin Vanity Address  `,
            serviceDate: getCurrentDate(),
        }
    });

    const createRoundedImage = (url: any): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const size = Math.min(img.width, img.height);

                canvas.width = size;
                canvas.height = size;

                if (!ctx) return
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(img, 0, 0, size, size);
                resolve(canvas.toDataURL("image/png"));
            };
        });
    };

    const generateInvoicePDF = async (invoiceData: any) => {
        const doc = new jsPDF();

        const logoUrl = "/pdf-logo.png";
        const roundedLogoBase64 = await createRoundedImage(logoUrl);


        const businessInfo = {
            name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Bitcoin Uni",
            address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Deine Geschäftsadresse",
            email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "kontakt@unternehmen.de",
            vatId: process.env.NEXT_PUBLIC_BUSINESS_VAT_ID || "DE123456789",
            phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+49 123 456 7890",
        };


        const {
            customerName,
            customerAddress,
            customerVatId,
            invoiceNumber,
            invoiceDate,
            serviceDate,
            serviceDescription,
            netAmount,
            vatAmount,
            grossAmount,
        } = invoiceData;




        doc.setFontSize(22);
        doc.text("Rechnung", 20, 20);

        doc.setFontSize(12);
        doc.text(`${businessInfo.name}`, 20, 40);
        doc.text(`${businessInfo.address}`, 20, 45);
        doc.text(`E-Mail: ${businessInfo.email}`, 20, 50);
        doc.text(`Telefon: ${businessInfo.phone}`, 20, 55);
        doc.text(`USt-IdNr.: ${businessInfo.vatId}`, 20, 60);

        doc.setFontSize(11);
        doc.text(`Rechnungsnummer: ${invoiceNumber}`, 140, 40);
        doc.text(`Rechnungsdatum: ${formatDate(invoiceDate)}`, 140, 45);
        doc.text(`Leistungsdatum: ${formatDate(serviceDate)}`, 140, 50);

        doc.setFontSize(12);
        doc.text("Rechnung an:", 20, 80);
        doc.text(`${customerName}`, 20, 85);
        doc.text(`${customerAddress}`, 20, 90);
        doc.text(`USt-IdNr.: ${customerVatId}`, 20, 95);

        doc.line(20, 100, 190, 100);

        doc.text("Leistungsbeschreibung:", 20, 110);
        doc.text(`${serviceDescription}`, 20, 115);

        doc.line(20, 125, 190, 125);

        doc.text("Netto-Betrag:", 140, 135);
        doc.text(`${netAmount} €`, 170, 135);

        doc.text("MwSt (19%):", 140, 145);
        doc.text(`${vatAmount} €`, 170, 145);

        doc.text("Brutto-Betrag:", 140, 155);
        doc.text(`${grossAmount} €`, 170, 155);

        doc.setFontSize(20);
        doc.setTextColor(0, 128, 0);
        doc.text("BEZAHLT", 140, 250);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.addImage(roundedLogoBase64, "PNG", 20, 240, 40, 40); // x, y, Breite, Höhe
        doc.text("Vielen Dank für Ihren Auftrag!", 60, 260);
        doc.save(`Rechnung_${invoiceNumber}.pdf`);
    };

    const onSubmit = (data: any) => {
        generateInvoicePDF({
            customerName: data.name,
            customerAddress: "Deine Adresse",
            customerPostalCode: "",
            customerCity: "",
            customerVatId: data.vatId,
            invoiceNumber: order._id.slice(0, 7),
            invoiceDate: getCurrentDate(),
            serviceDate: getCurrentDate(),
            serviceDescription: data.serviceDescription,
            netAmount: order.price,
            vatAmount: order.price * 0.19,
            grossAmount: order.price + (order.price * 0.19),
        });
    };

    return (
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Firmenname */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="name">Firmenname</Label>
                    <Input id="name" placeholder="Geben Sie den Firmennamen ein" type="text" {...register("name")} />
                    {errors.name && typeof errors.name.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.name.message}</p>
                    )}
                </LabelInputContainer>
            </div>

            {/* Kunden-Adresse */}
            <LabelInputContainer className="mb-4">
                <Label htmlFor="address">Straße und Hausnummer</Label>
                <Input
                    id="address"
                    placeholder="Geben Sie die Straße und Hausnummer ein"
                    type="text"
                    {...register("address")}
                />
                {errors.address && typeof errors.address.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.address.message}</p>
                )}
            </LabelInputContainer>

            {/* PLZ und Stadt */}
            <div className="flex space-x-2 mb-4">
                <LabelInputContainer className="flex-1">
                    <Label htmlFor="postalCode">PLZ</Label>
                    <Input
                        id="postalCode"
                        placeholder="PLZ"
                        type="text"
                        {...register("postalCode")}
                    />
                    {errors.postalCode && typeof errors.postalCode.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.postalCode.message}</p>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="flex-1">
                    <Label htmlFor="city">Stadt</Label>
                    <Input
                        id="city"
                        placeholder="Stadt"
                        type="text"
                        {...register("city")}
                    />
                    {errors.city && typeof errors.city.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.city.message}</p>
                    )}
                </LabelInputContainer>
            </div>

            {/* Kunden-E-Mail */}
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input id="email" placeholder="Geben Sie die E-Mail-Adresse ein" type="email" {...register("email")} />
                {errors.email && typeof errors.email.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.email.message}</p>
                )}
            </LabelInputContainer>

            {/* Umsatzsteuer-Identifikationsnummer (USt-IdNr.) */}
            <LabelInputContainer className="mb-4">
                <Label htmlFor="vatId">USt-IdNr.</Label>
                <Input id="vatId" placeholder="Geben Sie die Umsatzsteuer-ID ein" type="text" {...register("vatId")} />
                {errors.vatId && typeof errors.vatId.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.vatId.message}</p>
                )}
            </LabelInputContainer>


            {/* Absenden */}
            <Button type="submit" className="btn btn-primary">Rechnung erstellen</Button>
        </form>
    );
};

export default B2BInvoice; 
