'use client'

import React, { useEffect, useState } from 'react'
import Prefix from './Prefix'
import PubKey from './PubKey'
import SelectAddrType from './SelectAddrType'
import PriceCalculation from './PriceCalculation'
import { Button } from '../ui/button'
import { validatePublicKey } from 'unchained-bitcoin'
import { createOrder } from '@/lib/actions/order.action'

const FormPage = ({ translation }: any) => {
    const [price, setPrice] = useState<number>()
    const [addrType, setAddrType] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [caseSensitive, setCaseSensitive] = useState(true)
    const [pubKey, setPubKey] = useState('')
    const [pubkeyErr, setPubkeyErr] = useState('')

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
        const data = {
            addtype: addrType,
            prefixstr: prefixStr,
            casesensitive: caseSensitive ? 1 : 0,
            publickey: pubKey,
            price: price,
            createdAt: new Date,
        }

        try {
            const result = await createOrder(data)
            console.log(result)
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
                        ref={sectionRefs.pubKey}
                    >
                        <PubKey
                            pubKey={pubKey}
                            setPubKey={setPubKey}
                            pubkeyErr={pubkeyErr}
                            translate={translation.pubkeyTranslation}
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
