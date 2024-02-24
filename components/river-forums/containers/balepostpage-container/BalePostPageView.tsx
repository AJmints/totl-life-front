'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BalePostPageViewContainer = () => {

    const [ baleDetails, setBaleDetails ] = useState<any|null>(null)
    const [ comments, setComments ] = useState<any[]>([])

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const getBale = async() => {

            const id: string | null | undefined = searchParams?.get('baleid')
            const log: string | undefined = pathname?.split("/river/").pop()?.split("/").shift()

            console.log(log)
            if (id === null || id === undefined || id === "") {
                console.log("triggerd")
            }

            const makeLogRequest = await fetch( URL + "/logs/get-specific-bale/" + log + "/" + id)
            const response = await makeLogRequest.json().catch((err) => {
                console.log("It went bad")
            })

            console.log(response)

        }
        getBale()

    }, [])

    return (
        <>
        <div className='ml-10 mt-5'>
            <button className='bg-gray-400 p-3 rounded-md hover:bg-emerald-500 duration-300' onClick={() => router.back()}>Back</button>
        </div>
        {/* 2 columns, left is post title and body that flows down into comment box option and viewable comments from other users.
        2nd column has the community with the *pending* log rules
        
        Break each of these up and work on the get call that sends the data */}
        </>
    )
}

export default BalePostPageViewContainer