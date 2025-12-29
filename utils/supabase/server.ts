'use server'
import { createClient } from '@supabase/supabase-js'
import { Task } from '@/types/custom'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
const supabase = createClient(supabaseUrl, supabaseKey)


export async function getTasksFromDB(userId: string){
  const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  if(error){
    console.error("Error fetching tasks:", error)
    return []
  }
  
  //sort tasks, unfinished_tasks appear ontop the list
  return data.sort((a,b) => a.is_completed - b.is_completed)
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
  .update({ is_completed: !currentStatus })
  .eq('id', taskID)

  if (error) console.error("Error toggling task:", error)
}

export async function signUpNewUser(email:string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'http://localhost:3000/',//TODO: Change to '/app' page
    },
  })
}

export async function signInWithEmail(email:string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}