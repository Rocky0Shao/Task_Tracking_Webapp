'use server'
import { getTasksFromDB, addTaskToDB, toggleTaskInDB } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function handleAddTask(taskTitle: string, taskDescription: string =''){
    await addTaskToDB(taskTitle, taskDescription)
    revalidatePath('/')
}

export async function handleToggleTask(id: string, currentStatus: boolean) {
    await toggleTaskInDB(id, currentStatus);
    revalidatePath('/');
}