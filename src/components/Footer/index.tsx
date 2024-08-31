import {Button} from "@/components/ui/button";
import {Home, RefreshCw, Share2} from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer
            className="sticky bottom-0 bg-background border-t md:hidden">
            <nav className="container flex justify-around py-2">
                <Link href="/home">
                    <Button variant="ghost" size="icon">
                        <Home className="h-5 w-5"/>
                    </Button>
                </Link>
                <Link href="/edit">
                    <Button variant="ghost" size="icon">
                        <RefreshCw className="h-5 w-5"/>
                    </Button>
                </Link>
                <Link href="/save">
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5"/>
                    </Button>
                </Link>
            </nav>
        </footer>
    )
}