'use client'
import {Task} from '../types/custom';
import { handleToggleTask } from "@/app/actions"; 

export function TaskItem({ task}: { task: Task}){  


    return(
        <li>
            <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleToggleTask(task.id, task.is_completed)}
            />
            <span className={task.is_completed? 'line-through':''}>
                {task.title}
            </span>
            
        </li>
    )
}