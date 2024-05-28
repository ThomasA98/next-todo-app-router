'use client'

import { SessionProvider } from "next-auth/react"

export interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}