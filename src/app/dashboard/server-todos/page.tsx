export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";
import { redirect } from "next/navigation";

export default async function TodoSServerPage() {

  const user = await getUserSessionServer()

  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    orderBy: { description: 'asc' },
    where: { userId: user.id }
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