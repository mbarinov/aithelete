"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {
    List,
    X,
    SignOut,
    Sun,
    Moon,
    Brain
} from "@phosphor-icons/react/dist/ssr";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {User} from "next-auth";

interface HeaderProps {
    isAuthorized: boolean;
    user?: User;
    onLogout?: () => void;
}

export function Header({isAuthorized, user, onLogout}: HeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = sessionStorage.getItem("theme");
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (isDark: boolean) => {
            setIsDarkMode(isDark);
            document.documentElement.classList.toggle("dark", isDark);
            sessionStorage.setItem("theme", isDark ? "dark" : "light");
        };

        if (savedTheme) {
            applyTheme(savedTheme === "dark");
        } else {
            applyTheme(darkModeMediaQuery.matches);
        }

        const handleDarkModeChange = (event: MediaQueryListEvent) => {
            applyTheme(event.matches);
        };

        darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

        return () => {
            darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        document.documentElement.classList.toggle("dark", newIsDarkMode);
        sessionStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
    };

    const authorizedMenuItems = (
        <>
            <Link href="/home" className="transition-colors hover:text-foreground/80 text-foreground">
                Home
            </Link>
            <Link href="/edit" className="transition-colors hover:text-foreground/80 text-foreground">
                Generate a program
            </Link>
        </>
    );

    const guestMenuItems = (
        <>
            <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground">
                Features
            </Link>
            <Link href="/#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground">
                How It Works
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <>
                            <Brain className="h-8 w-8 text-primary dark:text-white"/>
                            <span className="text-2xl font-bold text-primary dark:text-white">AIthelete</span>
                        </>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {isAuthorized ? authorizedMenuItems : guestMenuItems}
                    </nav>
                </div>
                <button
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6"/>
                    ) : (
                        <List className="h-6 w-6"/>
                    )}
                </button>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="md:hidden flex-1">
                        <div className="flex items-center self-center space-x-2 w-full justify-center">
                            <Brain className="h-8 w-8 text-primary dark:text-white"/>
                            <span className="text-2xl font-bold text-primary dark:text-white">AIthelete</span>
                        </div>
                    </div>

                    <nav className="flex items-center md:flex-1 md:justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle theme"
                            className="mr-6 hidden md:inline-flex"
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? (
                                <Sun className="h-6 w-6 text-yellow-500"/>
                            ) : (
                                <Moon className="h-6 w-6 text-gray-800"/>
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </nav>
                    {isAuthorized ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        {user?.image && user?.name && (
                                            <AvatarImage src={user.image} alt={user.name}/>
                                        )}
                                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="flex-col items-start">
                                    <div className="text-xs font-medium">{user?.email}</div>
                                    <div className="text-xs text-muted-foreground">{user?.name}</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onLogout?.()}>
                                    <SignOut className="mr-2 h-4 w-4"/>
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Start</Link>
                        </Button>
                    )}
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-4 pb-3 pt-2 flex-col flex ml-10">
                        {isAuthorized ? authorizedMenuItems : guestMenuItems}
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="Toggle theme"
                            className="w-full justify-start rounded-md px-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? (
                                <Sun className="mr-2 h-4 w-4 text-yellow-500"/>
                            ) : (
                                <Moon className="mr-2 h-4 w-4 text-gray-800"/>
                            )}
                            <span>{isDarkMode ? "Light" : "Dark"} mode</span>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
