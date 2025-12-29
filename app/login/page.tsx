'use client'
import { signUpNewUser, signInWithEmail } from "@/utils/supabase/server";
import {useState} from 'react'

/*
* isSignUP = false.
*   signup or sign in depends on which button user click 
*       -> change button color 
*           + change mode. 
*           + submit button text change 
*           + swap form onSubmit function.
*/


export default function loginPage(){
    const [isSignUp, setIsSignUP] =useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitSignUp = async (e:React.FormEvent) =>{
        e.preventDefault()
        await signUpNewUser(email, password)
        console.log('User Added:', email, password)
    }

    const handleSubmitSignIn = async (e:React.FormEvent) =>{
        e.preventDefault()
        await signInWithEmail(email, password)
        console.log('User Signed In:', email, password)
    }


    
    return(
        <form 
            onSubmit={isSignUp? handleSubmitSignUp : handleSubmitSignIn} 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto mb-8"
        >
            <input 
                type='email' 
                placeholder="Enter Email..."
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
            
            <input 
                type='text'
                placeholder="Enter Password..."
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
            

            
            <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                {isSignUp? "Sign Up" : "Log In"}
            </button>
        </form>
    )
}