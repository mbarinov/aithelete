import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation'
import {auth} from "@/auth";
import { signIn } from "./actions";

export const metadata: Metadata = {
    title: 'Login | AIthelete',
    description: 'Log in to access your personalized AI training program',
};

export default async function LoginPage() {
    const session = await auth();

    if (session) {
        redirect("/create");
    }

    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4  text-gray-900 dark:text-gray-100 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div
                className="w-full max-w-md space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center space-y-2">
                    <Brain className="h-12 w-12 text-primary dark:text-white"/>
                    <h1 className="text-3xl font-bold">Welcome to AIthelete</h1>
                    <p className="text-muted-foreground dark:text-gray-300 text-center">
                        Log in to access your personalized AI training program
                    </p>
                </div>

                <form
                    action={async () => {
                        "use server";

                        await signIn()
                    }}
                >
                    <Button className="w-full">
                        <svg className="mr-2 h-4 w-4" aria-hidden="true"
                             focusable="false" data-prefix="fab"
                             data-icon="google" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 488 512">
                            <path fill="currentColor"
                                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Sign in with Google
                    </Button>
                </form>

                    <p className="text-center text-sm text-muted-foreground dark:text-gray-300">
                        By signing in, you agree to our{' '}
                        <Link href="/terms"
                              className="font-medium text-primary dark:text-primary hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy"
                              className="font-medium text-primary dark:text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
            </div>
        </div>
        </section>
);
}