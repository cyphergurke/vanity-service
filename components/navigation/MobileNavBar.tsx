import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNavBar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-white text-2xl p-4 hover:bg-default">
                    {"<"}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Vanity Address Generator</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Login</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
