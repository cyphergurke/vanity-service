'use client'

import React, { RefObject } from 'react'

import AddrTypeCard from '../cards/AddrTypeCard';

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
      <div className='flex flex-col w-full lg:flex-row justify-center items-center gap-10 py-10 lg:px-10 '>
        <button
          className='w-[80%] md:max-w-[400px] lg:max-w-[400px]  text-left' /* max-w-[300px] */
          onClick={() => setAddrTypeAndScrollDown("1")}
        >
          <AddrTypeCard
            title={translate.legacyTitle}
            description=""
            content={paragraphs(translate.legacyText)}
            classNames={`h-[250px] w ${addrType === "1" ? 'bg-blue-gradient ' : 'bg-dark-blue-gradient'} `}
          />
        </button>
        <button
          className='w-[80%] md:max-w-[400px] lg:max-w-[400px] text-left'
          onClick={() => setAddrTypeAndScrollDown("3")}
        >
          <AddrTypeCard
            title={translate.nestedSegwitTitle}
            description=""
            content={paragraphs(translate.nestedSegwitText)}
            classNames={`h-[250px] ${addrType === "3" ? 'bg-blue-gradient ' : 'bg-dark-blue-gradient'} `}
          />
        </button>
        <button
          className='w-[80%] md:max-w-[400px] lg:max-w-[400px] text-left'
          onClick={() => setAddrTypeAndScrollDown("bc1q")}
        >
          <AddrTypeCard
            title={translate.nativeSegwitTitle}
            description=""
            content={paragraphs(translate.nativeSegwitText)}
            classNames={`h-[250px] ${addrType === "bc1q" ? 'bg-blue-gradient ' : 'bg-dark-blue-gradient'} `}
          />
        </button>
      </div>
    </>
  )
}

export default SelectAddrType