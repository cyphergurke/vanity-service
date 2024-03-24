'use client'

import React, { RefObject } from 'react'
import ContentCard from './ContentCard'

export const paragraphs = (text: string) => {
  return text.split('\n').map((line, index) => (
    <p className="text-white" key={index}>
      {line}
    </p>
  ));
}

type TSelectAddrType = {
  prefixRef: RefObject<HTMLDivElement>, 
  scroll: (nextSectionRef: any) => void,
  addrType: string,
  setAddrType: React.Dispatch<React.SetStateAction<string>>,
  translate: any,
}

const SelectAddrType = ({ prefixRef, scroll, addrType, setAddrType, translate }: TSelectAddrType) => {
  const setAddrTypeAndScrollDown = (addrt: string) => {
    setAddrType(addrt)
    scroll(prefixRef)
  }
  
  return (
    <>
      <h2 className='text-white text-2xl'>{translate.addrtypeTitle}</h2>
      <div className="flex md:w-[80%] lg:w-full pl-[10%] pr-[10%] flex-col   lg:flex-row gap-10 mt-10 items-center">
        <div
          className='w-7/8 md:w-3/4 lg:min-w-[300px]'
          onClick={() => setAddrTypeAndScrollDown("1")}
        >
          <ContentCard
            title={translate.legacyTitle}
            description=""
            content={paragraphs(translate.legacyText)}
            classNames={`h-[250px] ${addrType === "1" ? 'bg-dark-blue-gradient' : 'bg-blue-gradient'} `}
          />
        </div>
        <div
          className='w-7/8 md:w-3/4 lg:min-w-[300px]'
          onClick={() => setAddrTypeAndScrollDown("3")}
        >
          <ContentCard
            title={translate.nestedSegwitTitle}
            description=""
            content={paragraphs(translate.nestedSegwitText)}
             classNames={`h-[250px] ${addrType === "3" ? 'bg-dark-blue-gradient' : 'bg-blue-gradient'} `}
          />
        </div>
        <div
          className='w-7/8 md:w-3/4 lg:min-w-[300px]'
          onClick={() => setAddrTypeAndScrollDown("bc1q")}
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