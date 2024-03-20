'use client'

import { useUserContext } from "@/app/context/UserContextProvider"
import Link from "next/link"

let USER_ID: string

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const FollowingLogs = () => {
    const { logFollowList } = useUserContext()

    

    return (
        <>
        <div className='bg-gray-700/90 mx-auto p-4 rounded-md sm:w-72'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-2'>Following</h1>
            {logFollowList.map((item: string) => {
                return (
                    <div  key={item}>
                    <Link 
                    href={"/river/" + item} 
                    className='text-gray-300 text-sm text-left hover:text-emerald-500 duration-300'>log/{item}</Link>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default FollowingLogs