'use client'

import React, { RefObject, useEffect, useState } from 'react'
import Prefix from './Prefix'
import PubKey from '../pubkey/PubKey'
import SelectAddrType from './SelectAddrType'
import PriceCalculation from './PriceCalculation'
import { Button } from '../ui/button'
import { validatePublicKey } from 'unchained-bitcoin'
import { createOrder } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/actions/order.model'
import Contact from './Contact'
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export type TSectionRef = {
    selectAddrType: RefObject<HTMLDivElement>,
    prefix: RefObject<HTMLDivElement>,
    pubKey: RefObject<HTMLDivElement>
}

const FormPage = ({ translation }: any) => {
    const [price, setPrice] = useState<number>()
    const [addrType, setAddrType] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [caseSensitive, setCaseSensitive] = useState(true)
    const [pubKey, setPubKey] = useState('')
    const [pubkeyErr, setPubkeyErr] = useState('')
    const [order, setOrder] = useState<IOrder>()
    const [email, setEmail] = useState('')
    const [lnurl, setLnUrl] = useState('')

    const router = useRouter()
    const pathname = usePathname()

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
        console.log(addrType)
        if (addrType) {
            sectionRefs.prefix.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [addrType])

    const genOrderData = () => {
        const data = {
            _id: uuidv4(),
            addrtype: addrType,
            prefixstr: prefixStr,
            casesensitive: caseSensitive ? 1 : 0,
            publickey: pubKey,
            email: email,
            lnurl: lnurl,
            price: 1,
            status: "PENDING",
            createdAt: new Date,
        }
        return (data)
    }
    const onsubmit = async () => {
       
        console.log(pubKey)
        //  Order validation failed: status: Path `status` is required., _id: Path `_id` is required., publickey: Path `publickey` is required.


        try {
            const orderData = await genOrderData()
            const booking = await createOrder(orderData)
            const jsonorder = await booking
            console.log(jsonorder, "!!!!!!!!!!!!!!!!!!!!")
            // router.push(`${pathname}/order/${jsonorder._id}`)
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
                            email={email}
                            lnurl={lnurl}
                            setEmail={setEmail}
                            setLnUrl={setLnUrl}
                        />
                    </section>
                    <section>
                        <Button disabled={!addrType && !prefixStr && !pubKey} onClick={() => {console.log(pubKey); onsubmit()}}>Submit</Button>
                    </section>

                </>)}
        </div>
    )
}

export default FormPage
