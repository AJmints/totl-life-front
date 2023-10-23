import { useEffect, useState } from 'react'
import Link from 'next/link'

let USER_ID: string
const URL = process.env.NEXT_PUBLIC_BACKEND_URL
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

const LogFollowList = (props: any) => {

    // const [joinedLogs, setJoinedLogs] = useState<string[]>([])

    // useEffect(() => {
    //     const retrieveLogList = async() => {
    //         if (!await authCheck()) {
    //             console.log("")
    //         }
    //         const askForList = await fetch( URL + "/logs/user-logs/" + USER_ID + "/" + props.logName )
    //         const response = await askForList.json().catch((err) => {
    //             console.log(err)
    //         })
    //         if (response.status) {
    //             // setJoinedLogs(response.logNames)
    //         }
    //         if (response.status === "present") {
    //             props.setFollowing((prev: boolean) => !prev)
    //         } else if (response.status === "absent") {
    //             props.setFollowing(false)
    //         }
    //     } 


    //     if (props.logName !== "") {
    //     retrieveLogList()
    //     }
    // }, [props.logName])

    return (
        <div className='bg-gray-700/90 p-4 rounded-md w-72 mx-2'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-2'>Following</h1>
            {props.joinedLogs.map((item: string) => {
                return (
                    <div  key={item}>
                    <Link 
                    href={"/logs/" + item} 
                    className='text-gray-300 text-sm text-left hover:text-emerald-500 duration-300'>log/{item}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default LogFollowList