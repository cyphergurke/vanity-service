import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const page = () => {
    return (
        <div className="flex justify-center h-[44vh] w-full items-center">
            <div className="w-[90%] md:w-2/3 lg:w-1/2">
                <div className="relative bottom-0 w-full pt-5 px-20 rounded-md">
                    <div className="absolute inset-0 bg-slate-950 opacity-45 rounded-md pointer-events-none"></div>
                    <div className="relative p-5 text-white rounded-md z-10">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that match the other
                                    components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you
                                    prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
