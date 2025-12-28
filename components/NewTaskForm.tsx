'use client'
import { useState } from "react"
import { handleAddTask } from '@/app/actions'
export function NewTaskForm(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        await handleAddTask(title, description)
        console.log('Task Added:', title, description)
        setTitle('')
        setDescription('')
    }
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder="Add New Task here..."
                value={title}
                onChange={e=>setTitle(e.target.value)}
            >
            </input>
            <input 
                type='text'
                placeholder="Write a few notes?"
                value={description}
                onChange={e=>setDescription(e.target.value)}>
            </input>
            <button
                type="submit">
                Add
            </button>
        </form>
    )
}