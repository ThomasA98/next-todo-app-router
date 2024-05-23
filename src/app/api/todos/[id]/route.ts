import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse, NextRequest } from 'next/server'
import * as Yup from 'yup'

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Segments) {

    // const { pathname } = new URL(request.url)

    // const id = pathname.split('/').at(-1)

    const { id } = params

    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    })

    if (!todo) return NextResponse.json({ message: `Todo ${id} not found` }, { status: 404 })

    return NextResponse.json(todo)
}

const putSchema = Yup.object({
    description: Yup.string().optional(),
    complete: Yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segments) {
    try {
        const { id } = params
        const { complete, description } = await putSchema.validate(await request.json())

        const todo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })

        if (!todo) return NextResponse.json({ message: `Todo ${id} not found` }, { status: 404 })

        return NextResponse.json(todo)
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            return NextResponse.json('Item Not found', { status: 404 })

        if (error instanceof Error)
            return NextResponse.json(error.message, { status: 400 })

        return NextResponse.json('error unknown', { status: 400 })
    }
}