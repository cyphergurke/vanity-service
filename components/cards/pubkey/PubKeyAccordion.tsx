import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function PubKeyAccordion({translate}: any) {
    return (
      <Accordion type="single" collapsible className="w-full">
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
          <AccordionContent>
          {translate.exportPubkeyText}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  