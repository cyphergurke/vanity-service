import React from 'react'
import AGB_DE from './AGB_DE';
import AGB_EN from './AGB_EN';

const LegalPage = ({ params }: { params: { locale: any } }) => {
    return (
        <div className="flex flex-col justify-center px-5 md:lg:px-20 py-20 rounded-lg">
            <div className="relative container text-gray-100 ">
                <div className="absolute inset-0 bg-slate-950 opacity-55 rounded-lg pointer-events-none"></div>
                <div className="relative pt-4 md:lg:p-10 rounded-lg z-10">
                    <h1 className="text-2xl md:lg:text-3xl font-bold">Allgemeine Geschäftsbedingungen der Bitcoin Uni</h1>
                    <div className="flex flex-col pt-7 mb-24 text-left md:text-left lg:text-left">
                        <p>Bitcoin Uni - Vanity Address Service</p>
                        <p>{process.env.OWNER_NAME}</p>
                        <p>{process.env.ADDR_STREET}</p>
                        <p>{process.env.ADDR_ZIP_AND_CITY}</p>
                        <p>{process.env.PHONE_NUMBER}</p>
                        <p>{process.env.EMAIL_ADDRESS}</p>
                        <br />
                        <p>Umsatzsteuer-Identifikationsnummer (USt-IdNr.):</p>
                        <p>{process.env.UST_NR}</p>
                    </div>
                    <p>Allgemeine Geschäftsbedingungen der Bitcoin Uni</p>
                    {params.locale === "en" ? <AGB_EN /> : <AGB_DE />}
                </div>
            </div>
        </div>

    )
}

export default LegalPage
