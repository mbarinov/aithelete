"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brain } from "@phosphor-icons/react/dist/ssr";

export function Header() {
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
        <header className="container mx-auto px-4 py-6 flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
            <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary dark:text-white" />
                <span className="text-2xl font-bold text-primary dark:text-white">AIthelete</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
                <Link href="#features" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
                    Features
                </Link>
                <Link href="#how-it-works" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
                    How It Works
                </Link>
            </nav>
            <div className="flex gap-4 justify-center">
            <button
                onClick={toggleDarkMode}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
                {isDarkMode ? "🌞" : "🌜"}
            </button>
            <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Sign Up
            </Link>
            </div>
        </header>
    );
}