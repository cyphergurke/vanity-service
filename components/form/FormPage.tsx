'use client'

import React, { useEffect, useState } from 'react'
import Prefix from './Prefix'
import PubKey from './PubKey'
import SelectAddrType from './SelectAddrType'
import PriceCalculation from './PriceCalculation'
import { Button } from '../ui/button'
import { validatePublicKey } from 'unchained-bitcoin'
import { createOrder } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/actions/order.model'
import Contact from './Contact'
import { usePathname, useRouter } from 'next/navigation'

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

    const sectionRefs = {
        selectAddrType: React.createRef<HTMLDivElement>(),
        prefix: React.createRef<HTMLDivElement>(),
        pubKey: React.createRef<HTMLDivElement>()
    }

    useEffect(() => {
        if (addrType) {
            sectionRefs.prefix.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [addrType])


    const onsubmit = async () => {
        console.log("03a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd")
        const pub = "03a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd"
        if (!price && !pubKey) return;
        const data = {
            addtype: addrType,
            prefixstr: prefixStr,
            casesensitive: caseSensitive ? 1 : 0,
            publickey: pub,
            email: email,
            lnurl: lnurl,
            price: 1,
            createdAt: new Date,
        }
        console.log(data)

        try {
            const orderstr = await createOrder(data)
            const jsonorder = JSON.parse(orderstr!)
            router.push(`${pathname}/order/${jsonorder._id}`)
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
        if (!validate) setPubKey('')
    }, [pubKey])

    return (
        <div className="flex flex-col justify-center  items-center gap-20">
            <section
                className="flex flex-col justify-center  items-center"
                ref={sectionRefs.selectAddrType}
            >
                <SelectAddrType
                    addrType={addrType}
                    setAddrType={setAddrType}
                    translate={translation.addrTypeTranslation}
                />
            </section>
            {addrType && (
                <>
                    <section
                        className="flex flex-col lg:flex-col justify-center gap-10 items-center"
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
                    <section className="flex flex-col justify-center  items-center" >
                        <Contact
                            translate={translation.contactTranslation}
                            email={email}
                            lnurl={lnurl}
                            setEmail={setEmail}
                            setLnUrl={setLnUrl}
                        />
                    </section>
                    <section>
                        <Button disabled={!!addrType && !!prefixStr && !!pubKey} onClick={() => onsubmit()}>Submit</Button>
                    </section>
                </>)}
        </div>
    )
}

export default FormPage
