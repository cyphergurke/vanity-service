"use client"

import React, { useEffect, useState } from 'react'
import Prefix from './Prefix'
import PubKey from './PubKey'
import SelectAddrType from './SelectAddrType'
import { TFormData } from '@/types'
import PriceCalculation from './PriceCalculation'
import { Button } from '../ui/button'

const FormPage = ({ translation }: any) => {
    const [formData, setFormData] = useState<TFormData>({})
    const [addrType, setAddrType] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [caseSensitive, setCaseSensitive] = useState(true)
    const [pubKey, setPubKey] = useState('')

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


    const onsubmit = () => {
        if (!addrType || !prefixStr || !pubKey) return
        const data = {
            addtype: addrType,
            prefixstr: prefixStr,
            casesensitive: caseSensitive ? 1 : 0,
            publickey: pubKey
        }
        // const result = await 
    }

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
                            translate={translation.pubkeyTranslation}
                        />
                    </section>
                    <section>
                        {addrType && prefixStr && pubKey && (
                            <Button onClick={() => onsubmit()}>Submit</Button>
                        )}
                    </section>
                </>)}
        </div>
    )
}

export default FormPage
