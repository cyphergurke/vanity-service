'use client'

import { calculatePrice } from '@/lib/pricecalculation'
import React, { useEffect, useState } from 'react'

type TPriceCalculation = {
    translate: any,
    addrType: string,
    prefixLen: number,
    caseSensitive: boolean,
    price: number | undefined;
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const PriceCalculation = ({ translate, addrType, prefixLen, caseSensitive, setPrice, price }: TPriceCalculation) => {




    useEffect(() => {
        const newprice: any = calculatePrice(addrType, prefixLen, caseSensitive)
        setPrice(newprice)
    }, [addrType, prefixLen, caseSensitive])


    return (
        <div className='text-white'>
            <h3>{translate.priceTitle}</h3>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <p >{translate.addrType}: </p>
                    <p>{addrType}</p>
                </div>
                <div className='flex justify-between'>
                    <p>{translate.prefixLenght}:</p>
                    <p>{prefixLen}</p>
                </div>
                <div className='flex justify-between gap-10'>
                    <p>{translate.prefixCasesensitive}:</p>
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