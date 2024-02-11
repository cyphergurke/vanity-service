'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type TChooseType = {
    title: string,
    description: any,
    content: any,
    button?: any
}
export default function ContentCard({
    content,
    description,
    title,
    button
}: TChooseType) {
    return (
        <Card className="w-full
         bg-black  border-none transition-all  duration-700
         hover:shadow-white shadow-lg shadow-accent-foreground cursor-pointer">
            <CardHeader>
                <CardTitle className="text-slate-300 text-center text-xl ">{title}</CardTitle>
                <CardDescription className="text-slate-500">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter className="flex justify-center">
                 {button && (
                    <Button>{button.text}</Button>
                 )}
            </CardFooter>
        </Card>
    )
}

