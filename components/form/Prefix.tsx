'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const Prefix = ({ translate }: any) => {
  const addrtype = "1"
  const [preview, setpreview] = useState(addrtype)
  const [prefix, setPrefix] = useState('')

  const regexP2PKH = /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/;
  const regexP2SH = /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/;
  const regexBech32 = /^bc1[q|p][0-9a-zA-HJ-NP-Z]{1,39}$/;

  const validateAddressPrefix = () => {

    const rules: any = {
      "1": {
        allowed: /^[1-9A-HJ-NP-Za-km-z]+$/,
        disallowed: /[0OIl]/,
        maxLength: 8,
        typeName: "Legacy",
      },
      "3": {
        allowed: /^[2-9A-Qa-z][0-9A-Za-z]*$/,
        disallowed: /[0OIl]/,
        maxLength: 8,
        typeName: "Nested SegWit",
      },
      "bc1q": {
        allowed: /^[0-9a-qs-z]{1,10}$/,
        disallowed: /[1bio]/,
        maxLength: 10,
        typeName: "Native SegWit Bech32",
      },
    };
    const rule: any = rules[addrtype];
    if (!rule) {
      return "Invalid address type.";
    }
    if (prefix.length > rule.maxLength) {
      return `${rule.typeName} address prefix cannot be more than ${rule.maxLength} characters.`;
    }
    // Check for disallowed characters
    if (rule.disallowed.test(prefix)) {
      return `Disallowed character detected in ${rule.typeName} address prefix.`;
    }
    // Check if all characters are allowed
    if (!rule.allowed.test(prefix)) {
      return `Invalid characters in ${rule.typeName} address prefix.`;
    }
  }

  useEffect(() => {
    validateAddressPrefix()
  }, [prefix, addrtype])
  
  return (
    <>
      <h2 className='text-white text-2xl'>
        {translate.prefixTitle}
      </h2>
      <div>
        <Card className="w-[400px]
         bg-black  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground ">
          <CardHeader>
            <CardTitle className="text-slate-300 text-center">
            </CardTitle>
            <CardDescription className="text-slate-500">
              {translate.prefixSubTitle}

            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row text-white'>
              <p className='text-xl mr-2'>
                {addrtype}
              </p>
              {' '}
              <Input name="prefix" onChange={(e) => setPrefix(e.target.value)} className='text-white text-xl' />
            </div>
            <p className='text-white'>
              Preview: {preview + prefix}
              
            </p>
            <p className='text-red-500'>{validateAddressPrefix()}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Checkbox id="terms" className='border-white' />
            <Label
              htmlFor="terms"
              className="text-sm font-medium ml-1 text-white  cursor-pointer peer-disabled:opacity-70"
            >
              {translate.prefixCasesensitive}
            </Label>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Prefix