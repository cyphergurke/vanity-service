import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function PubKeyAccordion() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the Public Key?</AccordionTrigger>
          <AccordionContent>
          Obtaining a Bitcoin public key from a secure wallet involves a process that ensures both the security of your assets and the accessibility of your public information for transactions. A Bitcoin public key is derived from the corresponding private key and is used to create Bitcoin addresses to which others can send Bitcoin. Here's a general guide on where and how to get your Bitcoin public key from a secure wallet
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>1. Choose a Secure Bitcoin Wallet</AccordionTrigger>
          <AccordionContent>
          
First, ensure you're using a reputable and secure Bitcoin wallet. Wallets come in various forms, including hardware wallets (like Ledger Nano X or Trezor), software wallets (such as Exodus, Electrum, or wallets provided by exchanges like Coinbase), and mobile wallets (like Mycelium or Trust Wallet).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  