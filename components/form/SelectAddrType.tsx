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

const SelectAddrType = ({ translate }: any) => {
  return (
    <>
      <h2 className='text-white text-2xl'>{translate.addrtypeTitle}</h2>
      <div className="flex w-3/4 flex-row gap-10 ">
        <div
          className='w-1/3'
          onClick={() => console.log("awdawdawdawdawdalwidhalwkdjhlawkdjhl")}>
          <ContentCard
            title={translate.legacyTitle}
            description=""
            content={paragraphs(translate.legacyText)}

          />
        </div>
        <div className='w-1/3'
          onClick={() => console.log("awdawdawdawdawdalwidhalwkdjhlawkdjhl")}>
          <ContentCard
            title={translate.nestedSegwitTitle}
            description=""
            content={paragraphs(translate.nestedSegwitText)}
          />
        </div>
        <div className='w-1/3' >
          <ContentCard
            title={translate.nativeSegwitTitle}
            description=""
            content={paragraphs(translate.nativeSegwitText)}
          />
        </div>
      </div>
    </>
  )
}

export default SelectAddrType