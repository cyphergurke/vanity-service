
import { GuideLine } from '@/components/ui/GuideLine';
import { guideDataDE, guideDataEN } from '@/data/guideData';
import React from 'react'

const page = ({ params }: { params: { locale: any } }) => {
    return (
        <div className=' flex justify-center w-full h-full mt-20 '>
            <div className="relative   w-[90%] lg:md:w-2/3 mb-48 pt-5 px-4 md:lg:px-6 rounded-md">
                <div className="absolute inset-0 bg-slate-950 opacity-45 rounded-md pointer-events-none"></div>
                <div className=' h-full relative  text-white  z-10'>
                    <GuideLine data={params.locale === "en" ? guideDataEN : guideDataDE} />
                </div>
            </div>
        </div >
    )
}

export default page
