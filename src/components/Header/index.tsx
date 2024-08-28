"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {Brain, SignOut, Sun, Moon} from "@phosphor-icons/react/dist/ssr";
import {
    Avatar, AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import type {User} from "next-auth"


interface HeaderProps {
    isAuthorized: boolean;
    user?: User,
    onLogout?: () => void;
}

export function Header({isAuthorized, user, onLogout}: HeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header
            className="container mx-auto px-4 py-6 flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
            <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary dark:text-white"/>
                <span
                    className="text-2xl font-bold text-primary dark:text-white">AIthelete</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
                <Link href="#features"
                      className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
                    Features
                </Link>
                <Link href="#how-it-works"
                      className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
                    How It Works
                </Link>
            </nav>
            <div className="flex gap-4 justify-center items-center">
                <Button
                    variant="outline" size="icon"
                    onClick={toggleDarkMode}
                    className="w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                    {isDarkMode ? (
                        <Sun
                            className="h-4 w-4 text-yellow-500 dark:text-yellow-500"/>
                    ) : (
                        <Moon
                            className="h-4 w-4 text-gray-800 dark:text-gray-200"/>
                    )}
                </Button>
                {isAuthorized ? (
                    <>
                        {user && (
                            <div className="flex items-center space-x-2">
                                <span
                                    className="text-gray-800 dark:text-gray-200">{user.name}</span>
                                <Avatar>
                                    {user.image && user.name && (
                                        <AvatarImage src={user.image}
                                                     alt={user.name}/>
                                    )}
                                    <AvatarFallback>{user.name}</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        <Button
                            className="rounded-full"
                            variant="outline" size="icon"
                            onClick={() => onLogout?.()}>
                            <SignOut
                                className="h-4 w-4 text-primary dark:text-white"/>
                        </Button>
                    </>
                ) : (
                    <Button asChild>
                        <Link href="/login">Start</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}