'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useParams } from "next/navigation"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Link from 'next/link'

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

const CreateNewBale = (props: any) => {

    const [path, setPath] = useState<string>("")

    const pathname: string | null = usePathname()
    const router: AppRouterInstance = useRouter()

    useEffect(() => {

        query()
    
    }, [])

    const query = () => {

        if (pathname?.split("/river/").pop() === "/river") {
            setPath("")
        } else {
            setPath("?log=" + pathname?.split("/river/").pop())
        }
    }

    return (
        <>
        <div className='flex justify-center items-center bg-gray-700/90 rounded-md p-3'>

            {/* <div className='ml-5'>
                <button className='bg-green-500 p-1 rounded-md'>LeftMenu</button>
            </div> */}

            <div className='flex sm:space-x-4'>
                <div className='mr-2'>
                    <label className="text-gray-200 font-light">Create Bale:</label>
                </div>
                <div className='flex justify-center'>
                    <input 
                        className="rounded-md font-normal w-36 sm:w-auto" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Create new Bale"
                        id='title' 
                        required 
                        minLength={10} maxLength={150} 
                        onClick={() => router.push("/river/new-bale" + path)}
                    />
                </div>
            </div>

            {/* <div className='mr-5'>
                <p className='p-1 bg-green-500 rounded-md'>RightMenu</p>
            </div> */}

        </div>
        
        </>
    )
}

export default CreateNewBale