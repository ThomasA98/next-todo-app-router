import bcrypt from 'bcryptjs'
import prisma from "@/lib/prisma"
import { auth } from '../authConfig'

export interface UserSignData {
    email?: string
    password?: string
}

export const signInEmailPassword = async ({ email, password }: UserSignData) => {

    if (!email || !password) return null

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        const newUser = createUser({
            email,
            password
        })

        return newUser
    }

    if (!bcrypt.compareSync(password, user.password ?? '')) return null

    return user

}

const createUser = async ({ email, password }: NonNullable<Record<keyof UserSignData, string>>) => {
    const user = await prisma.user.create({
        data: {
            email,
            isActive: true,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0],
        }
    })

    return user
}

export const getUserSessionServer = async () => {
    const session = await auth()

    return session?.user
}