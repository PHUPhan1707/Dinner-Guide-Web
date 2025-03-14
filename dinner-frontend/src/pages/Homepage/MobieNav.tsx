import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../components/ui/button";

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-organge-500" />
            </SheetTrigger>
            <SheetContent className="space-y-4">
                <SheetTitle>
                    <span>Wellcome to DinnerGuide!</span>
                </SheetTitle>

                <Separator />
                <SheetDescription className="flex">
                    <Button className="flex-1 font-bold bg-organge-5">Login In</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
