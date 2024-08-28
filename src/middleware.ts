import NextAuth from "next-auth"
import authConfig from "./auth.runtime"

export const { auth: middleware } = NextAuth(authConfig)