'use client'

import React, { RefObject, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { validatePublicKey } from 'unchained-bitcoin'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '../ui/button'
import Contact from '../cards/Contact'
import PubKey from '../cards/pubkey/PubKey'
import PriceCalculation from '../cards/PriceCalculation'
import Prefix from '../cards/Prefix'
import SelectAddrType from './SelectAddrType'
import axios from 'axios'

export type TSectionRef = {
    selectAddrType: RefObject<HTMLDivElement>,
    prefix: RefObject<HTMLDivElement>,
    pubKey: RefObject<HTMLDivElement>
}

const FormPage = ({ translation }: any) => {
    const [price, setPrice] = useState<number>()
    const [addrType, setAddrType] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [prefixErr, setPrefixErr] = useState<any | null>(null)
    const [caseSensitive, setCaseSensitive] = useState(true)
    const [pubKey, setPubKey] = useState('')
    const [pubkeyErr, setPubkeyErr] = useState('')
    const [email, setEmail] = useState('')
    const [lnurl, setLnUrl] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const router = useRouter()
    const pathName = usePathname()

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
        console.log(pathName)
        const data = {
            _id: id,
            language: pathName,
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
                router.push(`${pathName}/order/checkout/${id}`)
                setAddrType('')
                setPrefixStr('')
                setPubKey('')
                setSubmitting(false)
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
        const validate = validatePublicKey(pubKey)
        setPubkeyErr(validate)
    }, [pubKey])

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
                        translate={translation.addrTypeTranslation}
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
                                translate={translation.prefixTranslation}
                            />
                            <PriceCalculation
                                price={price}
                                setPrice={setPrice}
                                translate={translation.prefixTranslation}
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
                                translate={translation.pubkeyTranslation}
                            />
                        </section>
                        <section
                            className="flex flex-col justify-center  items-center"

                        >
                            <Contact
                                translate={translation.contactTranslation}
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
                                    Bestellung wird gesendet
                                </Button>
                            ) : (
                                <Button
                                    className='bg-green-700 transition-all duration-300
                                        hover:bg-green-600 hover:shadow-white hover:shadow-md active
                                        focus:border-white focus:border-2   focus:shadow-white focus:shadow-lg '
                                    disabled={!addrType || !prefixStr || !pubKey || !email}
                                    onClick={() => onsubmit()}>
                                    Berechnen
                                </Button>
                            )}
                        </section>

                    </>)}
            </div >
        </>
    )
}

export default FormPage
