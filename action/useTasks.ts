import { useState } from "react";
import { Task } from "@/types/custom";
import { dummyTasks } from "@/test_data/constants";
import { time } from "console";
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

    cost [task, toggleTask] = useState()
    const toggleTask=(task:Task)=>{

    }
}