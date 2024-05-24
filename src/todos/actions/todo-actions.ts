'use server'

import { Todo } from "@prisma/client"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const sleep = async (seconds: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1_000)
    })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    await sleep(3)

    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    })

    if (!todo) throw `Todo ${ id } Not found`

    const updatedTodo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            complete
        }
    })

    revalidatePath('/dashboard/server-todo')

    return updatedTodo
}

export const addTodo = async (description: string) => {
    try {

        const todo = await prisma.todo.create({
            data: { description }
        })

        revalidatePath('/dashboard/server-todo')
        return todo

    } catch (error) {
    }
}

export const deleteCompleted = async () => {
    await prisma.todo.deleteMany({
        where: {
            complete: true
        }
    })

    revalidatePath('/dashboard/server-todo')
}