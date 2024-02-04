'use client'

import React from 'react'
import ContentCard from './ContentCard'

const SelectAddrType = () => {
    return ( 
        <>
        
    <div className="flex flex-row gap-10 ">
    <div onClick={() => console.log("awdawdawdawdawdalwidhalwkdjhlawkdjhl")}>
      <ContentCard
        title="Legacy 1BTC..."
        description="
        awdawdawda
        "
        content={<p className="text-white"> Bitcoin Legacy Adresse
          beginnend mit einer 1,&nbsp;

          erlaubte Zeichen:&nbsp;1-9, a-z, A-Z
          nicht erlaubte Zeichen: 0, O, l, I
          bis zu acht Zeichen
          Höhere Transaktionsgebühren</p>}
      />
      </div>
      <div onClick={() => console.log("awdawdawdawdawdalwidhalwkdjhlawkdjhl")}>
      <ContentCard
        title="Nested SegWit 3Miaow..."
        description="awdawdawd"
        content={<p className="text-white">erlaubte erste Zeichen: 2-9, A-Q
          ab zweitem Zeichen: 0-9, a-z, A-Z
          nicht erlaubte Zeichen: 0, O, l, I
          bis zu acht Zeichen
          Mittlere Transaktionsgebühren</p>}
      />
       </div>
    </div>
    <div className="flex flex-row mt-10">
      <ContentCard
        title=" Native Segwit bc1q... "
        description=""
        content={<p>awdawd</p>}
      />
    </div>
    </>
    )
}

export default SelectAddrType