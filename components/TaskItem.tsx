'use client'
import {Task} from '../types/custom';
import { handleToggleTask } from "@/app/actions"; 

export function TaskItem({ task}: { task: Task}){  

    return(
        <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all mb-2">
            <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleToggleTask(task.id, task.is_completed)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            <span className={`flex-1 font-medium ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
            </span>
            <span className={`flex-1 font-medium ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.description}
            </span>
            
        </li>
    )
}