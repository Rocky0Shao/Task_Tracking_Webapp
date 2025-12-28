'use client'
import {Task} from '../types/custom';

export function TaskItem({ task, toggle}: { task: Task, toggle:(id: string)=>void}){  


    return(
        <li>
            <input
                type="checkbox"
                checked={task.is_completed}
                onChange={()=>toggle(task.id)}
            />
            <span className={task.is_completed? 'line-through':''}>
                {task.title}
            </span>
            
        </li>
    )
}