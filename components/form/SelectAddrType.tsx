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
      <div className="flex md:w-[80%] lg:w-3/4 flex-col   lg:flex-row gap-10 mt-10 items-center">
        <div
          className='w-3/4 lg:min-w-1/3'
          onClick={() => setAddrType("1")}
        >
          <ContentCard
            title={translate.legacyTitle}
            description=""
            content={paragraphs(translate.legacyText)}
            classNames={`h-[250px] ${addrType === "1" ? 'bg-dark-blue-gradient' : 'bg-blue-gradient'} `}
          />
        </div>
        <div
          className='w-3/4 lg:min-w-1/3'
          onClick={() => setAddrType("3")}
        >
          <ContentCard
            title={translate.nestedSegwitTitle}
            description=""
            content={paragraphs(translate.nestedSegwitText)}
             classNames={`h-[250px] ${addrType === "3" ? 'bg-dark-blue-gradient' : 'bg-blue-gradient'} `}
          />
        </div>
        <div
          className='w-3/4 lg:min-w-1/3'
          onClick={() => setAddrType("bc1q")}
        >
          <ContentCard
            title={translate.nativeSegwitTitle}
            description=""
            content={paragraphs(translate.nativeSegwitText)}
             classNames={`h-[250px] ${addrType === "bc1q" ? 'bg-dark-blue-gradient' : 'bg-blue-gradient'} `}
          />
        </div>
      </div>
    </>
  )
}

export default SelectAddrType