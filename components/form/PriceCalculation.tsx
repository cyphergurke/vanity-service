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
            <table>
                <thead>
                    <tr>
                        <th>{translate.priceTitle}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className=''>
                        <td >{translate.addrType}: </td>
                        <td>{addrType}</td>
                    </tr>
                    <tr>
                        <td>{translate.prefixLenght}:</td>
                        <td>{prefixLen}</td>
                    </tr>
                    <tr>
                        <td>{translate.prefixCasesensitive}</td>
                        <td>{caseSensitive ? translate.yes : translate.no}</td>
                    </tr>
                    <tr>
                        <td>
                            {translate.price}
                        </td>
                        <td>
                            {price}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PriceCalculation