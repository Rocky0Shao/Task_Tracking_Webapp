import { Task } from "@/types/custom";

export function NewTaskForm(){
    return(
        <form>
            <input 
                type='text' 
                placeholder="Add New Task here..."
            >
            </input>
            <input 
                type='text-field'
                placeholder="Write a few notes?">
            </input>
            <button
                type="submit">
                Add
            </button>
        </form>
    )
}