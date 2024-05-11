'use client'

import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { TprefixTranslation } from '@/types'
import { rules, validateAddressPrefix } from '@/lib/prefixValidation'

type TPrefix = {
  translate: TprefixTranslation,
  addrType: string,
  prefixStr: string,
  setPrefixStr: React.Dispatch<React.SetStateAction<string>>,
  prefixErr: any | null,
  setPrefixErr: React.Dispatch<React.SetStateAction<any | null>>,
  caseSensitive: boolean,
  setCaseSensitive: React.Dispatch<React.SetStateAction<boolean>>,
}


const Prefix = ({
  translate,
  addrType,
  prefixStr,
  setPrefixStr,
  prefixErr,
  setPrefixErr,
  caseSensitive,
  setCaseSensitive,
}: TPrefix) => {
  useEffect(() => {
    if (prefixStr.length > 0) {
      const validateErr: any = validateAddressPrefix(addrType, prefixStr, translate)
      setPrefixErr(validateErr)
    } else setPrefixErr(null)
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
    <div className='flex flex-col justify-center mt-20 items-center'>
      <h2 className='text-white text-2xl'>
        {translate.prefixTitle}
      </h2>
      <div className='mt-10'>
        <Card className="mx-auto w-[80%] lg:w-[400px]
         bg-blue-gradient  border-none transition-all  duration-700
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
              <Input
                name="prefix"
                type='text'
                maxLength={rules[addrType].maxLength}
                onChange={(e) => setPrefixStr(e.target.value)}
                className='text-white text-xl mr-auto 3/4 w-[170px] focus:shadow-white focus:shadow-md'
              />
            </div>
            <p className='text-white text-center mt-2'>
              {addrType}{caseSensitive ? prefixStr : randomCase(prefixStr)}...
            </p>
            <div className='text-red-500 text-center'>{prefixErr}</div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {addrType !== "bc1q" &&
              <>
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
              </>
            }
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Prefix