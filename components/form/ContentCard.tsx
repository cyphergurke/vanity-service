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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type TChooseType = {
    title: string,
    description: any,
    content: any,
}
export default function ContentCard({
    content,
    description,
    title
}: TChooseType) {
    return (
        <Card className="w-[300px]
         bg-black  border-none transition-all  duration-700
         hover:opacity-70 cursor-pointer">
            <CardHeader>
                <CardTitle className="text-slate-300 text-center">{title}</CardTitle>
                <CardDescription className="text-slate-500">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button>More Informatoion</Button>
            </CardFooter>
        </Card>
    )
}

