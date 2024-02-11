'use client'

import React from 'react'
import ContentCard from './ContentCard'

export const paragraphs = (text: string) => {
  return text.split('\n').map((line, index) => (
    <p className="text-white" key={index}>
      {line}
    </p>
  ));
}

type TSelectAddrType = {
  addrType: string,
  setAddrType: React.Dispatch<React.SetStateAction<string>>,
  translate: any,
}

const SelectAddrType = ({ addrType, setAddrType, translate }: TSelectAddrType) => {
  return (
    <>
      <h2 className='text-white text-2xl'>{translate.addrtypeTitle}</h2>
      <div className="flex md:w-[80%] lg:w-3/4 flex-col lg:flex-row gap-10 mt-10 items-center">
        <div
          className='w-3/4 lg:w-1/3'
          onClick={() => setAddrType("1")}
        >
          <ContentCard
            title={translate.legacyTitle}
            description=""
            content={paragraphs(translate.legacyText)}
            classNames={`${addrType === "1" ? 'bg-slate-900' : 'bg-black'} `}
          />
        </div>
        <div
          className='w-3/4 lg:w-1/3'
          onClick={() => setAddrType("3")}
        >
          <ContentCard
            title={translate.nestedSegwitTitle}
            description=""
            content={paragraphs(translate.nestedSegwitText)}
             classNames={`${addrType === "3" ? 'bg-slate-900' : 'bg-black'} `}
          />
        </div>
        <div
          className='w-3/4 lg:w-1/3'
          onClick={() => setAddrType("bc1q")}
        >
          <ContentCard
            title={translate.nativeSegwitTitle}
            description=""
            content={paragraphs(translate.nativeSegwitText)}
             classNames={`${addrType === "bc1q" ? 'bg-slate-900' : 'bg-black'} `}
          />
        </div>
      </div>
    </>
  )
}

export default SelectAddrType