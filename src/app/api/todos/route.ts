import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import * as Yup from 'yup'
import { getUserSessionServer } from '@/auth'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take))
        return NextResponse.json({ message: 'Take debe de ser un numero' }, { status: 400 })

    if (isNaN(skip))
        return NextResponse.json({ message: 'Skip debe de ser un numero' }, { status: 400 })


    const todos = await prisma.todo.findMany({
        take,
        skip,
    })

    return NextResponse.json(todos)
}

const postSchema = Yup.object({
    description: Yup.string().required(),
    complete: Yup.boolean().optional(),
})

export async function POST(request: Request) {

    const user = await getUserSessionServer()

    if (!user) return NextResponse.json('Unauthorized', { status: 401 })

    try {
        const { complete, description } = await postSchema.validate(await request.json())

        const todo = await prisma.todo.create({
            data: { complete, description, userId: user.id! }
        })

        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE() {
    const user = await getUserSessionServer()

    if (!user) return NextResponse.json('Unauthorized', { status: 401 })

    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true,
                userId: user.id
            }
        })

        return NextResponse.json({ message: 'ok' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error unknown' }, { status: 404 })
    }
}