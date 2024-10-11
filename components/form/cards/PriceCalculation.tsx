'use client'

import { calculatePrice } from '@/lib/pricecalculation'
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

type TPriceCalculation = {
    addrType: string,
    prefixLen: number,
    caseSensitive: boolean,
    price: number | undefined;
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const PriceCalculation = ({ addrType, prefixLen, caseSensitive, setPrice, price }: TPriceCalculation) => {
    const [taxPrice, setTaxPrice] = useState<number>(0)

    const p = useTranslations('Form')

    useEffect(() => {
        const generatePrice = async () => {
            const newprice = await calculatePrice(addrType, prefixLen, caseSensitive)
            setPrice(newprice.price)
            setTaxPrice(newprice.priceIncltaxes)
        }
        generatePrice()
    }, [addrType, prefixLen, caseSensitive])


    return (
        <div className='text-white border rounded-md p-6'>
            <h3>{p("price.priceTitle")}</h3>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <p >{p("price.addrType")}: </p>
                    <p>{addrType}</p>
                </div>
                <div className='flex justify-between'>
                    <p>{p("price.prefixLenght")}:</p>
                    <p>{prefixLen}</p>
                </div>
                <div className='flex justify-between gap-10'>
                    <p>{p("prefix.casesensitive")}:</p>
                    <p className='w-7 text-right'>{caseSensitive ? p("price.yes") : p("price.no")}</p>
                </div>
            </div>
            <hr></hr>
            <div className='flex flex-row justify-between'>
                <div className='flex-col'>
                    <p>{p("price.price")}</p>
                </div>
                <div className='flex-col'>
                    <p>{price}€</p>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex-col'>
                    <p>{p("price.taxPrice")}</p>
                </div>
                <div className='flex-col'>
                    <p>{taxPrice}€</p>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex-col'>
                    <p>{p("price.priceWithtax")}</p>
                </div>
                <div className='flex-col'>
                    <p>{price ? taxPrice + price : 0}€</p>
                </div>
            </div>
        </div >
    )
}

export default PriceCalculation