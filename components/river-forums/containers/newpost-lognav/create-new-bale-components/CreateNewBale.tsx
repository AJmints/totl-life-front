'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

let USER_ID: string
const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall: Response = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const CreateNewBale = () => {

    const pathname: string | null = usePathname()
    const router: AppRouterInstance = useRouter()

    useEffect(() => {
        console.log(pathname)
    }, []) 

    const handleNewPostRedirect = () => {
        router.push("/river/new-bale")
    
    }

    

    return (
        <>
        <div>
            <div className='w-full flex space-x-2'>
                    <label className="text-gray-200 font-light">Create Bale:</label>
                    <input 
                        className="rounded-md font-normal" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Create a new Bale"
                        id='title' 
                        required 
                        minLength={10} maxLength={150} 
                        onClick={() => handleNewPostRedirect()}
                    />
                </div>
        </div>
        
        </>
    )
}

export default CreateNewBale