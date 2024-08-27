import React from 'react'
import LegalDE from './legalDE';
import LegalEN from './legalEN';
import Link from 'next/link';

const LegalPage = ({ params }: { params: { locale: any } }) => {
    return (
        <div className="flex flex-col justify-center px-5 md:lg:px-20 py-20 rounded-lg">
            <div className="relative container text-gray-100 ">
                <div className="absolute inset-0 bg-slate-950 opacity-55 rounded-lg pointer-events-none"></div>
                <div className="relative pt-4 md:lg:p-10 rounded-lg z-10">
                    {params.locale === "en" ? <LegalEN /> : <LegalDE />}
                </div>
            </div>
        </div>

    )
}

export default LegalPage
