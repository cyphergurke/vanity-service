import React from 'react'
import Link from 'next/link';

const LegalPage = ({ params }: { params: { locale: any } }) => {
    return (
        <div className="flex flex-col justify-center px-5 md:lg:px-20 py-20 rounded-lg">
            <div className="relative container text-gray-100 ">
                <div className="absolute inset-0 bg-slate-950 opacity-55 rounded-lg pointer-events-none"></div>
                <div className="relative pt-4 md:lg:p-10 rounded-lg z-10">
                    <h1 className="text-3xl font-bold">Impressum:</h1>
                    <div className="flex flex-col pt-7 mb-24 text-left md:text-left lg:text-left">
                        <p>Bitcoin Uni - Vanity Address Service</p>
                        <p>{process.env.OWNER_NAME}</p>
                        <p>{process.env.ADDR_STREET}</p>
                        <p>{process.env.ADDR_ZIP_AND_CITY}</p>
                        <Link href={`tel:${process.env.PHONE_NUMBER}`} className="mt-5 text-violet-500">
                            {process.env.PHONE_NUMBER}
                        </Link>
                        <p>{process.env.NEXT_PUBLIC_EMAIL_ADDRESS}</p>
                        <br />
                        <p>Umsatzsteuer-Identifikationsnummer (USt-IdNr.): {process.env.UST_NR}</p>
                    </div>

                    <h1 className="text-3xl font-bold">Widerufsrecht:</h1>
                    <div className="flex flex-col pt-7 mb-24 text-left md:text-left lg:text-left">
                        <p>
                            Es gilt kein Widerufsrecht für Vanity Adressen, da der/die Kunde*in die Ware
                            nicht zurücksenden kann, da sie auch nicht mehr von wert oder Gebrauch ist,
                            gilt die Ausschlussregelung nach  § 312g Abs. 2 BGB.
                        </p>
                        <br />
                        <p>
                            Sofern Ihre Bestellung noch nicht fertig berechnet wurde,
                            können Sie die Bestellung stornieren, wobei eine Gebühr für die Dauer der
                            Berechnung anfallen kann!
                        </p>
                    </div>

                    <div className='flex text-xl text-center gap-10 text-violet-500'>
                        <Link href="legal/dsgvo" >
                            {params.locale === 'en' ? 'Privacy Policy' : 'Datenschutzvorordnung'}
                        </Link>
                        <Link href="legal/agb" >
                            {params.locale === 'en' ? 'Terms and Conditions' : 'AGB - Allgemeine Geschäftsbedingungen '}
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LegalPage
