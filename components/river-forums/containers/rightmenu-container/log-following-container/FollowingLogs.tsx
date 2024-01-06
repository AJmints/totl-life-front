'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

let USER_ID: string
const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

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

const FollowingLogs = (props: any) => {

    const [joinedLogs, setJoinedLogs] = useState<string[]>([])

    const pathname: string | null = usePathname()

    useEffect(() => {
        retrieveLogList()
    }, [])

    const retrieveLogList = async() => {

        if (!await authCheck()) {
            console.log("")
        }

        const routeCheck: string | undefined = pathname?.split("/river/").pop()
        let askForList: Response
        if ( routeCheck === "/river" ) {
            askForList = await fetch( URL + "/logs/user-logs/" + USER_ID + "/" + undefined )
        } else {
            askForList = await fetch( URL + "/logs/user-logs/" + USER_ID + "/" + routeCheck )
        }
        const response: any = await askForList.json().catch((err: Error) => {
            console.log(err)
        })
        
        setJoinedLogs(response.logNames)
        
        if (response.status === "present") {
            props.setFollowing(true)
        } else if (response.status === "absent") {
            props.setFollowing(false)
        }
    }

    

    return (
        <>
        <div className='bg-gray-700/90 mx-auto p-4 rounded-md w-72'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-2'>Following</h1>
            {joinedLogs.map((item: string) => {
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