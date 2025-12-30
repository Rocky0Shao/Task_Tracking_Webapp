'use client'
import { signUpNewUser, signInWithEmail } from "@/utils/supabase/server";
import {useState} from 'react'

import {Title} from '@/components/Title'

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
        setEmail('')
        setPassword('')
    }

    const handleSubmitSignIn = async (e:React.FormEvent) =>{
        e.preventDefault()
        await signInWithEmail(email, password)
        console.log('User Signed In:', email, password)
        setEmail('')
        setPassword('')
    }


    
    return(
        <>
        
        <Title/>
        <form 
            onSubmit={isSignUp? handleSubmitSignUp : handleSubmitSignIn} 
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full max-w-3xl mx-auto mb-8"
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
                type='password'
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

            <div className="blockw-full flex justify-center gap-4 mt-2">
                <button
                    type="button"
                    onClick={()=>setIsSignUP(false)}
                    className={`font-medium px-6 py-2 rounded-lg transition-colors border-b-4 ${
                                            !isSignUp ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                                        }`}                >
                    Log In
                </button>
                <button
                    type="button"
                    onClick={()=>setIsSignUP(true)}
                    className={`font-medium px-6 py-2 rounded-lg transition-colors border-b-4 ${
                                            isSignUp ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                                        }`}                >
                    Sign Up
                </button>
            </div>


        </form>
        </>
    )
}