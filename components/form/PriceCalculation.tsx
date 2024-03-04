import { calculatePrice } from '@/lib/pricecalculation'
import React, { useEffect, useState } from 'react'

type TPriceCalculation = {
    translate: any,
    addrType: string,
    prefixLen: number,
    caseSensitive: boolean,
}
const PriceCalculation = ({ translate, addrType, prefixLen, caseSensitive }: TPriceCalculation) => {
    const [price, setPrice] = useState<number>()



    useEffect(() => {
        const newprice: any = calculatePrice(addrType, prefixLen, caseSensitive)
        setPrice(newprice.sum)
    }, [addrType, prefixLen, caseSensitive])


    return (
        <div className='text-white'>
            <h3>{translate.priceTitle}</h3>
            <div className='flex flex-row gap-10'>
                <div className='flex-col'>
                    <p >{translate.addrType}: </p>
                    <p>{translate.prefixLenght}:</p>
                    <p>{translate.prefixCasesensitive}:</p>
                </div>
                <div className='flex-col'>
                    <p>{addrType}</p>
                    <p>{prefixLen}</p>
                    <p>{caseSensitive ? translate.yes : translate.no}</p>
                </div>
            </div>
            <hr></hr>
            <div className='flex flex-row justify-between'>
                <div className='flex-col'>
                    <p>{translate.price}</p>
                </div>
                <div className='flex-col'>
                    <p>{price}</p>
                </div>
            </div>
        </div >
    )
}

export default PriceCalculation