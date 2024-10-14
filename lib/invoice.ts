import jsPDF from "jspdf";
import { formatDate } from "./convertTimestamp";


type invoiceDataT = {
    customerName: string,
    customerAddress: string,
    customerPostalCodeAndCity: string,
    customerEmail: string,
    customerVatId: string,
    invoiceNumber: number,
    invoiceDate: Date,
    serviceDate: Date,
    serviceDescription: string,
    netAmount: number,
    vatAmount: number,
    grossAmount: number,
}

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



export const generateInvoicePDF = async (invoiceData: invoiceDataT) => {
    const doc = new jsPDF();

    const logoUrl = "/pdf-logo.png";
    const roundedLogoBase64 = await createRoundedImage(logoUrl);


    const {
        customerName,
        customerAddress,
        customerPostalCodeAndCity,
        customerEmail,
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
    doc.text(`${process.env.NEXT_PUBLIC_COMPANY_NAME}`, 20, 35);
    doc.text(`${process.env.NEXT_PUBLIC_POSTFACH}`, 20, 40);
    doc.text(`${process.env.NEXT_PUBLIC_ADDR_STREET}`, 20, 45);
    doc.text(`${process.env.NEXT_PUBLIC_ADDR_ZIP_AND_CITY}`, 20, 50);
    doc.text(`E-Mail: ${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`, 20, 55);
    doc.text(`Telefon: ${process.env.NEXT_PUBLIC_PHONE_NUMBER}`, 20, 60);
    doc.text(`USt-IdNr.: ${process.env.NEXT_PUBLIC_UST_NR}`, 20, 65);

    doc.setFontSize(11);
    doc.text(`Rechnungsnummer: ${invoiceNumber}`, 140, 40);
    doc.text(`Rechnungsdatum: ${formatDate(invoiceDate)}`, 140, 45);
    doc.text(`Leistungsdatum: ${formatDate(serviceDate)}`, 140, 50);

    doc.setFontSize(12);
    doc.text("Rechnung an:", 20, 80);
    doc.text(`${customerName}`, 20, 85);
    doc.text(`${customerAddress}`, 20, 90);
    doc.text(`${customerPostalCodeAndCity}`, 20, 95);
    doc.text(`${customerEmail}`, 20, 100);
    doc.text(`USt-IdNr.: ${customerVatId}`, 20, 105);

    doc.line(20, 110, 190, 110);

    doc.text("Leistungsbeschreibung:", 20, 120);
    doc.text(`${serviceDescription}`, 20, 125);

    doc.line(20, 135, 190, 135);

    doc.text("Netto-Betrag:", 140, 145);
    doc.text(`${netAmount} €`, 170, 145);

    doc.text("MwSt (19%):", 140, 155);
    doc.text(`${vatAmount} €`, 170, 155);

    doc.text("Brutto-Betrag:", 140, 165);
    doc.text(`${grossAmount} €`, 170, 165);

    doc.setFontSize(20);
    doc.setTextColor(0, 128, 0);
    doc.text("BEZAHLT", 140, 250);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.addImage(roundedLogoBase64, "PNG", 20, 240, 40, 40); // x, y, Breite, Höhe
    doc.text("Vielen Dank für Ihren Auftrag!", 60, 260);


    const pdfBlob = doc.output("blob");
    const formData = new FormData();
    formData.append("file", pdfBlob, `Rechnung_${invoiceData.invoiceNumber}.pdf`);

    try {
        await fetch('/api/invoice', {
            method: 'POST',
            body: formData,
        });
        doc.save(`Rechnung_${invoiceNumber}.pdf`);
    } catch (error) {
        alert("Fehler beim Speichern der PDF:" + error);
    }
};