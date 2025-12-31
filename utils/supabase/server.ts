'use server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Task } from '@/types/custom'
import { use } from 'react'

//helper that creates a Supabase client on the server side
//do this once per request
async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
export async function getCurrentUserId() {
  const supabase = await createSupabaseServerClient()
  
  // getUser() is the secure method for server-side auth validation
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error("User not authenticated:", error)
    return null
  }

  return user.id
}

export async function getTasksFromDB(){

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
     console.error("No active session")
     return []
  }

  const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })

  if(error){
    console.error("Error fetching tasks:", error)
    return []
  }
  
  //sort tasks, unfinished_tasks appear ontop the list
  return data.sort((a,b) => a.is_completed - b.is_completed)
}

export async function addTaskToDB(taskTitle: string, taskDescription: string =''){
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const newTask:Task = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title: taskTitle,
      is_completed: false,
      created_at: new Date().toISOString(),
      description: taskDescription
  }
  const { error } = await supabase
  .from('tasks')
  .insert(newTask)

  if (error){
    console.error("Error adding task:", error)
  }else{
    console.log("Task added successfully")
  }
}

export async function deleteTaskFromDB(taskId: string) { // Better to use ID than Title
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId) 
    .eq('user_id', user.id)

  if (error) {
    console.error("Error deleting task:", error)
  } else {
    console.log("Task deleted successfully")
  }
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
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${origin}/`,//TODO: Change to '/app' page
    },
  })

  if (error) {
      return { success: false, message: error.message }
    }
  return { success: true, message: 'Check your email for confirmation!' }
}

export async function signInWithEmail(email:string, password: string) {
  const supabase = await createSupabaseServerClient()
  console.log('Attempting to sign in with email:', email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
      return { success: false, message: error.message }
    }
  return { success: true, message: 'Signed in successfully' }
}