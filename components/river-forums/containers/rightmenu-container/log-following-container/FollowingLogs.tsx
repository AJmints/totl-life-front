'use client'

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useRiverContext } from "@/app/context/RiverContextProvider"
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

    // const [joinedLogs, setJoinedLogs] = useState<string[]>([])
    const { followingList, setFollowingList } = useRiverContext()

    const pathname: string | null = usePathname()
    const router = useRouter()

    useEffect(() => {
        const authFirstCheck = async() => {
            if (!await authCheck()) {
                router.push("/login")
            }  else {
                if (followingList.length > 0) {
                    console.log("Already retrieved")
                } else {
                    console.log("Refresh list")
                    retrieveLogList()
                }
            }
        }
        authFirstCheck()
    }, [])

    const retrieveLogList = async() => {
        
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
        
        setFollowingList(response.logNames)
        
        
        if (response.status === "present") {
            props.setFollowing(true)
        } else if (response.status === "absent") {
            props.setFollowing(false)
        }
    }

    

    return (
        <>
        <div className='bg-gray-700/90 mx-auto p-4 rounded-md sm:w-72'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-2'>Following</h1>
            {followingList.map((item: string) => {
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