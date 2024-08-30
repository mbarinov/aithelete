import type {Metadata} from "next";
import Link from "next/link"
import {Brain} from '@phosphor-icons/react/dist/ssr';
import {Header} from "@/components/Header";
import {auth} from "@/auth";
import {logout} from "@/app/actions";
import {cn} from "@/lib/utils";
import {Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import "./globals.css"

export const metadata: Metadata = {
    title: 'AIthelete - Your AI Personal Trainer',
    description: 'Personalized split training programs that are smart, effective, and tailored just for you!',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await auth();

    return (
        <html lang="en">
        <head>
            <link
                rel="icon"
                href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏋️‍♀️</text></svg>"
            />
        </head>
        <body
            className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Theme>
            <Header isAuthorized={!!session} onLogout={logout}
                    user={session?.user}/>
            <main className="flex-grow">{children}</main>
            <Footer/>
        </Theme>
        </body>
        </html>
    )
}

async function Footer() {
    const session = await auth();

    return (
        <footer
            className={cn("bg-gray-100/80 dark:bg-gray-800/80" +
                " backdrop-blur-sm py-8 relative", !!session && 'hidden' +
                ' md:visible')}>
            <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div
                className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Brain className="h-6 w-6 text-primary dark:text-white"/>
                    <span
                        className="text-xl font-bold text-primary dark:text-white">AIthelete</span>
                </div>
                <nav className="flex space-x-4">
                    <Link href="/privacy"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                    <Link href="/contact"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        Contact Us
                    </Link>
                </nav>
            </div>
        </footer>
    );
}