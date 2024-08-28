"use server";

import { signIn as AuthSignIn } from "@/auth"

export const signIn = async () => {
    await AuthSignIn("google", { redirectTo: "/create" })
}