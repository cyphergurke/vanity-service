'use client'

import React, { RefObject, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '../ui/button'
import PubKey from './cards/pubkey/PubKey'
import PriceCalculation from './cards/PriceCalculation'
import Prefix from './cards/Prefix'
import SelectAddrType from './SelectAddrType'
import axios from 'axios'
import { isValidBitcoinPublicKey } from '@/lib/keypair'
import { useLocale, useTranslations } from 'next-intl'
import DeliveryContact from './cards/DeliveryContact'
import Link from 'next/link'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export type TSectionRef = {
    selectAddrType: RefObject<HTMLDivElement>,
    prefix: RefObject<HTMLDivElement>,
    pubKey: RefObject<HTMLDivElement>
}

const FormPage = () => {
    const [price, setPrice] = useState<number>()
    const [addrType, setAddrType] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [prefixErr, setPrefixErr] = useState<any | null>(null)
    const [caseSensitive, setCaseSensitive] = useState(true)
    const [pubKey, setPubKey] = useState('')
    const [pubkeyErr, setPubkeyErr] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [lnurl, setLnUrl] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const f = useTranslations()

    const router = useRouter()
    const locale = useLocale()

    const sectionRefs: TSectionRef = {
        selectAddrType: React.createRef<HTMLDivElement>(),
        prefix: React.createRef<HTMLDivElement>(),
        pubKey: React.createRef<HTMLDivElement>()
    }
    const scrollToSection = (nextSectionRef: RefObject<HTMLDivElement>) => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        if (addrType) {
            sectionRefs.prefix.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [addrType])

    const genOrderData: any = (id: string) => {
        let cs: number = caseSensitive ? 1 : 0
        if (addrType === "bc1q") {
            cs = 1
        }
        const data = {
            _id: id,
            language: locale,
            addrtype: addrType,
            prefixstr: prefixStr,
            casesensitive: cs,
            publickey: pubKey,
            email: email,
            lnurl: lnurl,
            status: "PENDING",
            createdAt: new Date,
        }
        return (data)
    }
    const onsubmit = async () => {
        try {
            setSubmitting(true)
            const id = uuidv4()
            const orderData: any = await genOrderData(id)
            const res: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create`, orderData)
            if (res.data.created) {
                router.push(`/${locale}/order/checkout/${id}`)
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!pubKey) {
            setPubkeyErr('')
            return
        }
        const validate = isValidBitcoinPublicKey(pubKey)
        setPubkeyErr(validate)
    }, [pubKey])


    const [agbChecked, setAgbChecked] = useState(false)
    const [dsgvoChecked, setDsgvoChecked] = useState(false)

    const isButtonEnabled = agbChecked && dsgvoChecked && addrType && prefixStr && pubKey && email


    return (
        <>
            <div className="flex flex-col justify-center  items-center gap-20">
                <section
                    className="flex flex-col justify-center  items-center"
                    ref={sectionRefs.selectAddrType}
                >
                    <SelectAddrType
                        prefixRef={sectionRefs.prefix}
                        scroll={scrollToSection}
                        addrType={addrType}
                        setAddrType={setAddrType}
                    />
                </section>
                {addrType && (
                    <>
                        <section
                            className="flex flex-col lg:flex-col justify-center  gap-10 items-center"
                            ref={sectionRefs.prefix}
                        >
                            <Prefix
                                addrType={addrType}
                                prefixStr={prefixStr}
                                setPrefixStr={setPrefixStr}
                                prefixErr={prefixErr}
                                setPrefixErr={setPrefixErr}
                                caseSensitive={caseSensitive}
                                setCaseSensitive={setCaseSensitive}
                            />
                            <PriceCalculation
                                price={price}
                                setPrice={setPrice}
                                caseSensitive={caseSensitive}
                                addrType={addrType}
                                prefixLen={prefixStr.length}
                            />
                        </section>
                        <section
                            className="flex flex-col justify-center  items-center"
                        >
                            <PubKey
                                pubKey={pubKey}
                                setPubKey={setPubKey}
                                pubkeyErr={pubkeyErr}
                            />
                        </section>
                        <section
                            className="flex flex-col justify-center  items-center"

                        >
                            <DeliveryContact
                                setEmail={setEmail}
                                setLnUrl={setLnUrl}
                            />
                        </section>
                        <section>
                            {submitting ? (
                                <Button
                                    className='bg-green-700 transition-all duration-300
                                    hover:bg-green-600 hover:shadow-white hover:shadow-md active
                                     focus:border-white focus:border-2 focus:shadow-white focus:shadow-lg '
                                    disabled={true}>
                                    {locale === 'en' ? 'Send Booking' : 'Bestellung wird gesendet'}
                                    <div className="spinner mx-auto w-4  h-4  my-auto"></div>
                                </Button>
                            ) : (
                                <div className=''>
                                    <div className='flex flex-col space-y-2  bg-white p-2 rounded-md  '>
                                        <p className=''>
                                            {f('Cookie.accepting')}:
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="agb"
                                                checked={agbChecked}
                                                onCheckedChange={(checked) => setAgbChecked(checked === true)}
                                            />
                                            <Label htmlFor="agb" className="text-sm font-medium text-blue-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                <Link href={`/${locale}/legal/agb`} target='_blank'>
                                                    {f('Cookie.agb')}
                                                </Link>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="dsgvo"
                                                checked={dsgvoChecked}
                                                onCheckedChange={(checked) => setDsgvoChecked(checked === true)}
                                            />
                                            <Label htmlFor="dsgvo" className="text-sm font-medium text-blue-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                <Link href={`/${locale}/legal/dsgvo`} target='_blank'>
                                                    {f('Cookie.dsgvo')}
                                                </Link>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className='flex py-5 justify-center'>
                                        <Button
                                            className='flex gap-2 bg-green-700 transition-all duration-300
                                        hover:bg-green-600 hover:shadow-white hover:shadow-md active
                                        focus:border-white focus:border-2   focus:shadow-white focus:shadow-lg '
                                            disabled={!addrType || !prefixStr || !pubKey || !email || !isButtonEnabled}
                                            onClick={() => onsubmit()}>
                                            {f('Form.calculate')}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </section>

                    </>)}
            </div >
        </>
    )
}

export default FormPage
