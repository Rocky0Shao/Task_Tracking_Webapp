import { TaskItem } from '@/components/TaskItem'
import {Title} from '@/components/Title'
import { dummyTasks } from '@/test_data/constants'
export default function Home() {
  return (
    <main>
      <Title/>
      <ul>  
        {dummyTasks.map(task => <TaskItem key={task.id} task={task}/>)}
      </ul>
    </main>
  )
}