import { createClient } from '@supabase/supabase-js'
import { Task } from '@/types/custom'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 

export const supabase = createClient(supabaseUrl, supabaseKey)


export async function getTasksFromDB(userId: string){
  const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', userId)

  if(error){
    console.error("Error fetching tasks:", error)
    return []
  }
  return data
}

export async function addTaskToDB(userId: string, taskTitle: string, taskDescription: string =''){
  const newTask:Task = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: taskTitle,
      is_completed: false,
      created_at: new Date().toISOString(),
      description: taskDescription
  }
  const { error } = await supabase
  .from('tasks')
  .insert(newTask)
}

export async function toggleTaskInDB(taskID: string, currentStatus: boolean){
  const { error } = await supabase
  .from('tasks')
  .update({ is_complete: !currentStatus })
  .eq('id', taskID)

  if (error) console.error("Error toggling task:", error)
}
