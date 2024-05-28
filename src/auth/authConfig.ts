import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// necesario para el tipado de JWT (token)
import 'next-auth/jwt'
import { signInEmailPassword } from './actions/auth-actions'

export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? 'user_id',
            clientSecret: process.env.GITHUB_SECRET ?? 'secret',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? 'user_id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'secret',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const user = await signInEmailPassword({
                    email: credentials!.email as string,
                    password: credentials!.password as string,
                })

                if (user) return user
                return null

            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true
        },
        async jwt({ account, token, user, profile }) {

            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            })

            token.roles = dbUser?.roles ?? ['no-roles']
            token.id = dbUser?.id ?? 'no-UUID'

            return token
        },
        async session({ session, token, user }) {

            if (session && session.user) {
                session.user.roles = token.roles
                session.user.id = token.id
            }

            return session
        }
    }
}

export const { handlers, auth } = NextAuth(authOptions)