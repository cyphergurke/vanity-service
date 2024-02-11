'use client'

import React from 'react'
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const PubKey = ({ translate }: any) => {

  return (
    <>
      <h2 className='text-white text-2xl'>
        {translate.pubkeyTitle}
      </h2>
      <div>
        <Card className="w-[300px]
         bg-black  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground cursor-pointer">
          <CardHeader>
            <CardTitle className="text-slate-300 text-center">
              {translate.prefixTitle}
            </CardTitle>
            <CardDescription className="text-slate-500">

            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Input type='checkbox'></Input>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default PubKey