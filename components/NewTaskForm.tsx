'use client'
import { Task } from "@/types/custom";
import React from "react";

// export function NewTaskForm({onAdd}: {onAdd: (task: Task)=>void}){
export function NewTaskForm(){
    // const handleSubmit = (e:React.FormEvent){
    //     e.preventDefault()
    //     onAdd()
    // }

    return(
        // <form onSubmit={()=>onAdd}>
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