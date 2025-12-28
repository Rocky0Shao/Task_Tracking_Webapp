'use client'
import { TaskItem } from '@/components/TaskItem'
import {Title} from '@/components/Title'
import { dummyTasks } from '@/test_data/constants'
import { NewTaskForm } from '@/components/NewTaskForm'
import { useTasks } from '@/hooks/useTasks'

export default function Home() {
  const {tasks, addTask, toggleTask} = useTasks();
  return (
    <main>
      <Title/>
      {/* <NewTaskForm onAdd={addTask}/> */}
      <NewTaskForm/>
      
      <ul>  
        {tasks.map(task => 
          <TaskItem 
            key={task.id} 
            task={task}
            toggle={toggleTask}/>)}
      </ul>
    </main>
  )
}