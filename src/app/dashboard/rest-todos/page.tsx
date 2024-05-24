import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export default async function TodoSPage() {

  const todos = await prisma.todo.findMany({
    orderBy: {
      createAt: 'desc'
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <NewTodo />
      </div>
      <TodosGrid todos={ todos } />
    </div>
  );
}