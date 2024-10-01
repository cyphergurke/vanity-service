// components/InvoiceForm.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LabelInputContainer } from "@/components/form/Contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentDate } from "@/lib/convertTimestamp";
// Zod Schema für Validierung der Rechnungsdaten
const invoiceSchema = z.object({
    name: z.string().min(1, "Der Firmenname ist erforderlich"),
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
            email: "",
            vatId: "",
            serviceDescription: `Bitcoin Vanity Address ${order.prefixstr}`,
            serviceDate: getCurrentDate(),
        }

    });

    const onSubmit = (data: any) => {
        console.log("Rechnung erstellt:", data);
        alert("Rechnung erfolgreich erstellt!");
        reset();
    };

    return (
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Ihr Name" type="text" {...register("name")} />
                    {errors.name && typeof errors.name.message === "string" && (
                        <p className="error text-red-600 text-sm">{errors.name.message}</p>
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

            {/* Leistungsbeschreibung */}
            <LabelInputContainer className="mb-8">
                <Label htmlFor="serviceDescription">Leistungsbeschreibung</Label>
                <Textarea
                    disabled
                    className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]"
                    id="serviceDescription"
                    placeholder="Beschreiben Sie die erbrachte Leistung"
                    {...register("serviceDescription")}
                />
                {errors.serviceDescription && typeof errors.serviceDescription.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.serviceDescription.message}</p>
                )}
            </LabelInputContainer>

            {/* Leistungsdatum */}
            <LabelInputContainer className="mb-4">
                <Label htmlFor="serviceDate">Leistungsdatum</Label>
                <Input id="serviceDate" type="date" disabled {...register("serviceDate")} />
                {errors.serviceDate && typeof errors.serviceDate.message === "string" && (
                    <p className="error text-red-600 text-sm">{errors.serviceDate.message}</p>
                )}
            </LabelInputContainer>

            {/* Absenden */}
            <button type="submit" className="btn btn-primary">Rechnung erstellen</button>
        </form>
    );
};

export default B2BInvoice; 
