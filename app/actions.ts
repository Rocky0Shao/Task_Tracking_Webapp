'use server'
import { getTasksFromDB, addTaskToDB, toggleTaskInDB } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function handleAddTask(userId: string, taskTitle: string, taskDescription: string =''){
    userId = "b9c4569d-bd49-43e0-91ba-aa119a6d14fc"
    await addTaskToDB(userId, taskTitle, taskDescription)
    revalidatePath('/')
}

export async function handleToggleTask(id: string, currentStatus: boolean) {
    await toggleTaskInDB(id, currentStatus);
    revalidatePath('/');
}