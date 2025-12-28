'use client'
import { useState } from "react"
import { handleAddTask } from '@/app/actions'

export function NewTaskForm(){
    const userId = "b9c4569d-bd49-43e0-91ba-aa119a6d14fc"
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        await handleAddTask(userId, title, description)
        console.log('Task Added:', title, description)
        setTitle('')
        setDescription('')
    }
    
    return(
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto mb-8"
        >
            <input 
                type='text' 
                placeholder="Add New Task here..."
                value={title}
                onChange={e=>setTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
            
            <input 
                type='text'
                placeholder="Write a few notes?"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
            
            <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Add
            </button>
        </form>
    )
}