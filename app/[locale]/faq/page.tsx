
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { paragraphs } from '@/lib/formatText'
import { useTranslations } from 'next-intl'
import React from 'react'

const page = () => {

    const f = useTranslations('FAQ')

    const translation = {
        title: f("title"),
        q1: {
            title: f("q1.title"),
            text: f("q1.text"),
        },
        q2: {
            title: f("q2.title"),
            text: f("q2.text"),
        },
        q3: {
            title: f("q3.title"),
            text: f("q3.text"),
        },
        q4: {
            title: f("q4.title"),
            text: f("q4.text"),
        },
        q5: {
            title: f("q5.title"),
            text: f("q5.text"),
        },
        q6: {
            title: f("q6.title"),
            text: f("q6.text"),
        },
    }


    return (
        <div className="flex justify-center h-full pb-10 w-full items-center  ">
            <div className="w-[90%] md:w-2/3 lg:w-1/2">
                <h1 className='text-white text-xl md:lg:text-2xl p-6'>{translation.title}</h1>
                <div className="relative bottom-0 w-full pt-5 px-4 md:lg:px-6 rounded-md">
                    <div className="absolute inset-0 bg-slate-950 opacity-45 rounded-md pointer-events-none"></div>
                    <div className="relative p-5 w-full text-white rounded-md z-10">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className='text-left'>{translation.q1.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q1.text)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>{translation.q2.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q2.text)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>{translation.q3.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q3.text)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>{translation.q4.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q4.text)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>{translation.q5.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q5.text)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>{translation.q6.title}</AccordionTrigger>
                                <AccordionContent>
                                    {paragraphs(translation.q6.text)}
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
