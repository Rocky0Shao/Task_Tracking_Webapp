'use server'
import { TaskItem } from '@/components/TaskItem'
import { Title } from '@/components/Title'
import { NewTaskForm } from '@/components/NewTaskForm'
import { getTasksFromDB } from '@/utils/supabase/server' // Import DB fetcher directly

export default async function Home() {
  const tasks = await getTasksFromDB()

  return (
    <main>
      <Title />

      <NewTaskForm />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </main>
  )
}