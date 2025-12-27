import {Task} from '../types/custom';
export function TaskItem({ task}: { task: Task}){
    return(
        <li>
            <input
                type="checkbox"
            />
            <span className={task.is_completed? 'line-through':''}>
                {task.title}
            </span>
            
        </li>
    )
}