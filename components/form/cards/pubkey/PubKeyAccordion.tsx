import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react";


export function PubKeyAccordion({ translate }: any) {

  const formatText = (text: string) => {
    return text.split('\n').map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Accordion type="single" collapsible className="w-full text-slate-800">
      <AccordionItem value="item-1">
        <AccordionTrigger>{translate.aboutPubkeyTitle}</AccordionTrigger>
        <AccordionContent>
            {translate.aboutPubkeyText}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{translate.chooseWalletTitle}</AccordionTrigger>
        <AccordionContent>
            {translate.chooseWalletText}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>{translate.exportPubkeyTitle}</AccordionTrigger>
        <AccordionContent className="whitespace-pre-line">
            {formatText(translate.exportPubkeyText)}
          <video className="w-full mt-4"  controls>
            <source src="/api/video" type="video/mp4" />
          </video>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
