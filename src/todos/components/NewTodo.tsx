'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { IoTrashOutline } from "react-icons/io5"
import * as todoApi from '@/todos/helpers/todos'
import { addTodo, deleteCompleted } from "../actions/todo-actions"

const MIN_DESCRIPTION_PERMITTED = 5

export const NewTodo = () => {

    const [ description, setDescription ] = useState('')
    const router = useRouter()

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (description.length < MIN_DESCRIPTION_PERMITTED) return;

        const newTodo = await todoApi.createTodo(description)

        setDescription('')
        router.refresh()
        return newTodo
    }

    const onDeleteCompleted = async () => {
        await deleteCompleted()
    }

    return (
        <div className='flex w-full justify-between'>
            <form onSubmit={ onSubmit } className="flex gap-2">
                <input type="text"
                    className="flex-[4] p-2 rounded-lg border-gray-200 outline-none focus:border-sky-500 transition-all"
                    placeholder="¿Qué necesita ser hecho?"
                    value={ description }
                    onChange={ event => setDescription(event.target.value) }
                />
                <button type='submit' className="flex flex-[1] items-center justify-center rounded bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                    Crear
                </button>
            </form>

            <button
                onClick={ () => onDeleteCompleted() }
                className="flex items-center justify-center rounded bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
                <IoTrashOutline />
                Delete TODO done
            </button>
        </div>
    )
}