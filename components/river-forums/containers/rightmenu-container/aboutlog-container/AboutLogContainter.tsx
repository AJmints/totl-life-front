'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"


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

interface RetrieveLogListResponse {
    status: string,
    logNames: string[],
}

const AboutLogContainer = () => {

    const [following, setFollowing] = useState<boolean>(false)
    const [joinedLogs, setJoinedLogs] = useState<string[]>([])
    const pathname: string | null = usePathname()

    useEffect(() => {
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
            const response: RetrieveLogListResponse = await askForList.json().catch((err: Error) => {
                console.log(err)
            })

            console.log(response)
            
            setJoinedLogs(response.logNames)
            
            if (response.status === "present") {
                setFollowing(true)
            } else if (response.status === "absent") {
                setFollowing(false)
            }
        }

        retrieveLogList()
    
    }, [])

    return (
        <>
            <div className="bg-gray-500 rounded-md px-20">
                <p>Container for about</p>
            </div>
        </>
    )
}

export default AboutLogContainer