'use server'
import { TaskItem } from '@/components/TaskItem'
import { Title } from '@/components/Title'
import { NewTaskForm } from '@/components/NewTaskForm'
import { getTasksFromDB, createClient } from '@/utils/supabase/server' // Import DB fetcher directly

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const tasks = await getTasksFromDB()
  const completedTasks = tasks.filter(task => task.is_completed).length
  const remainingTasks = tasks.length - completedTasks

  return (
    <main>
      <Title />
      {user && (
        <div className="text-center mb-4">
          <p className="text-lg">Welcome, {user.email}</p>
          <p>You have {remainingTasks} tasks remaining and {completedTasks} tasks completed.</p>
        </div>
      )}
      <NewTaskForm />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </main>
  )
}