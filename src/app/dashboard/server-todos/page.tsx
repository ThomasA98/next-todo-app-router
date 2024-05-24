export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export default async function TodoSServerPage() {

  const todos = await prisma.todo.findMany()

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <NewTodo />
      </div>
      <TodosGrid todos={ todos } />
    </div>
  );
}