'use client'
import { useState } from "react"

export function NewTaskForm({onAdd}: {onAdd: (t:string, d:string)=>void}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')



    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault()
        onAdd(title,description)
        
        setTitle('')
        setDescription('')
    }
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder="Add New Task here..."
                onChange={e=>setTitle(e.target.value)}
            >
            </input>
            <input 
                type='text-field'
                placeholder="Write a few notes?"
                onChange={e=>setDescription(e.target.value)}>
            </input>
            <button
                type="submit">
                Add
            </button>
        </form>
    )
}