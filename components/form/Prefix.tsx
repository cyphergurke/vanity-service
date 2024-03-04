'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { TprefixTranslation } from '@/types'

type TPrefix = {
  translate: TprefixTranslation,
  addrType: string,
  prefixStr: string,
  setPrefixStr: React.Dispatch<React.SetStateAction<string>>,
  caseSensitive: boolean,
  setCaseSensitive: React.Dispatch<React.SetStateAction<boolean>>,
}

const rules: any = {
  "1": {
    allowed: /^[1-9A-HJ-NP-Za-km-z]+$/,
    disallowed: /[0OIl]/,
    maxLength: 8,
    typeName: "Legacy",
  },
  "3": {
    allowed: /^[2-9A-Q][0-9A-Za-z]*$/,
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

const Prefix = ({
  translate,
  addrType,
  prefixStr,
  setPrefixStr,
  caseSensitive,
  setCaseSensitive,
}: TPrefix) => {
  const validateAddressPrefix = () => {
    const rule: any = rules[addrType];

    if (!rule) {
      return;
    }
    if (prefixStr.length < 1) return
    if (prefixStr.length > rule.maxLength) {
      return `${rule.typeName} address prefix cannot be more than ${rule.maxLength} characters.`;
    }
    // Check for disallowed characters
    if (rule.disallowed.test(prefixStr)) {
      return `Disallowed character detected in ${rule.typeName} address prefix.`;
    }
    // Check if all characters are allowed
    if (!rule.allowed.test(prefixStr)) {
      return `Invalid characters in ${rule.typeName} address prefix.`;
    }
    // updateFormData()
  };

  useEffect(() => {
    validateAddressPrefix()
  }, [prefixStr, addrType])

  function randomCase(str: string): string {
    let result = '';
    const charArray = str.split('');
    const isLowerCase = addrType === "1" || addrType === "3";
    const isUpperCase = addrType === "3";
    
    for (let i = 0; i < charArray.length; i++) {
      const char = charArray[i];
      const isLower = Math.random() < 0.5;
      
      if (isLowerCase && (char === "o" || char === "i")) {
        result += char;
      } else if (isUpperCase && i === 0) {
        result += char.toUpperCase();
      } else {
        result += isLower ? char.toLowerCase() : char.toUpperCase();
      }
    }
    
    return result;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-white text-2xl'>
        {translate.prefixTitle}
      </h2>
      <div className='mt-10'>
        <Card className="mx-auto w-[80%] lg:w-[400px]
         bg-black  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground ">
          <CardHeader>
            <CardTitle className="text-slate-300 text-center">
            </CardTitle>
            <CardDescription className="text-white">
              {translate.prefixSubTitle}

            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row text-white items-center text-center '>
              <p className='text-xl mr-2 items-center ml-auto'>
                {addrType}
              </p>
              {' '}
              <Input name="prefix"
                type='text'
                maxLength={10}
                onChange={(e) => setPrefixStr(e.target.value)}
                className='text-white text-xl mr-auto w-1/2 '
              />
            </div>
            <p className='text-white text-center mt-2'>
              {addrType}{caseSensitive ? prefixStr : randomCase(prefixStr)}...
            </p>
            <p className='text-red-500'>{validateAddressPrefix()}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Checkbox
              id="casesensitive"
              defaultChecked
              onClick={() => setCaseSensitive(!caseSensitive)}
              className='border-white' />
            <Label
              htmlFor="casesensitive"
              className="text-sm font-medium ml-1 text-white  cursor-pointer peer-disabled:opacity-70"
            >
              {translate.prefixCasesensitive}
            </Label>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Prefix