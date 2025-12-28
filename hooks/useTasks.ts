'use client'
import { useState } from "react";
import { Task } from "@/types/custom";
import { dummyTasks } from "@/test_data/constants";
import { getTasksFromDB, addTaskToDB, toggleTaskInDB } from "@/utils/supabase/server";
//Custom hook.
//Use: const { tasks, toggleTask } = useTasks();
export function useTasks(){
    const [tasks, setTasks] = useState<Task[]>(dummyTasks)
    const addTask=(title:string, description:string='')=>{
        const newTask:Task = {
            id: crypto.randomUUID(),
            user_id: '"e52c34c5-5555-4422-92a1-8d2b7c6d1a10",',
            title: title,
            is_completed: false,
            created_at: new Date().toISOString(),
            description: description
        }

        setTasks(oldTasks => [newTask, ...oldTasks])    
    }

    //toggle task.is_complete?
    const toggleTask = (id:string) =>{
        setTasks(
            oldTasks => oldTasks.map(
                task => task.id === id
                    ?{...task, is_completed:!task.is_completed} 
                    : task
            )
        )
    }
    return {
        tasks,
        addTask,
        toggleTask
    }
}