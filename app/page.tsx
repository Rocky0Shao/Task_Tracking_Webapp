'use client'
import { signUpNewUser, signInWithEmail } from "@/utils/supabase/server";
import {useState} from 'react'
import { useRouter } from 'next/navigation'
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
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmitSignUp = async (e:React.FormEvent) =>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        
        try {
            const result = await signUpNewUser(email, password)
            if (result.success) {
                console.log('User Added:', email, password)
                setEmail('')
                setPassword('')
                // Use window.location for full page reload to ensure cookies are recognized
                window.location.href = '/dashboard'
            } else {
                setError(result.message || 'Sign up failed')
                setLoading(false)
            }
        } catch (err) {
            setError('An unexpected error occurred')
            setLoading(false)
            console.error('Sign up error:', err)
        }
    }

    const handleSubmitSignIn = async (e:React.FormEvent) =>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        
        try {
            const result = await signInWithEmail(email, password)
            if (result.success) {
                console.log('User Signed In:', email, password)
                setEmail('')
                setPassword('')
                // Use window.location for full page reload to ensure cookies are recognized
                window.location.href = '/dashboard'
            } else {
                setError(result.message || 'Sign in failed')
                setLoading(false)
            }
        } catch (err) {
            setError('An unexpected error occurred')
            setLoading(false)
            console.error('Sign in error:', err)
        }
    }


    
    return(
        <>
        
        <Title/>
        {error && (
            <div className="w-full max-w-3xl mx-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
            </div>
        )}
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
                disabled={loading}
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Loading..." : (isSignUp? "Sign Up" : "Log In")}
            </button>

            <div className="block w-full flex justify-center gap-4 mt-2">
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