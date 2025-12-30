'use server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Task } from '@/types/custom'

//helper that creates a Supabase client on the server side
//do this once per request
async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export async function getTasksFromDB(userId: string){

  const supabase = await createSupabaseServerClient()
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
  const supabase = await createSupabaseServerClient()
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
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
  .from('tasks')
  .update({ is_completed: !currentStatus })
  .eq('id', taskID)

  if (error) console.error("Error toggling task:", error)
}

export async function signUpNewUser(email:string, password: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'http://localhost:3000/',//TODO: Change to '/app' page
    },
  })

  if (error) {
      return { success: false, message: error.message }
    }
  return { success: true, message: 'Check your email for confirmation!' }
}

export async function signInWithEmail(email:string, password: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
      return { success: false, message: error.message }
    }
  return { success: true, message: 'Signed in successfully' }
}