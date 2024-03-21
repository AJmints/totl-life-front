'use client'

import { useUserContext } from "@/app/context/UserContextProvider"
import Link from "next/link"

const FollowingLogs = () => {
    const { logFollowList } = useUserContext()

    

    return (
        <>
        <div className='bg-gray-700/90 mx-auto p-4 rounded-md sm:w-72'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-3'>Following</h1>
            {
                logFollowList.length === 0 ? 
                <div className="text-gray-300">
                    <p>You have not Joined any Logs</p>
                </div>
                :
                <div className="bg-gray-400 rounded-md p-0.5">
                <div className='no-scrollbar container h-28 rounded-md overflow-y-scroll bg-gray-600 '>
                {logFollowList.map((item: string) => {
                    return (
                        <>
                        <div className="py-1 hover:bg-gray-700" key={item}>
                        <Link 
                        href={"/river/" + item} 
                        className='text-gray-300 text-sm ml-5 text-left hover:text-emerald-500 duration-300'>log/{item}</Link>
                        </div>
                        <hr/>
                        </>
                    )
                })}
                </div>
                </div>
            }
        </div>
        </>
    )
}

export default FollowingLogs