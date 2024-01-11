'use client'

import { useState, useEffect } from "react"
import { useRiverContext } from "@/app/context/RiverContextProvider"

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

const FollowJoinLog = (props: any) => {

    const [ loadingFollow, setLoadingFollow ] = useState<boolean>(false)
    const [ following, setFollowing ] = useState<boolean>(false)
    const { followingList, setFollowingList } = useRiverContext()


    useEffect(() => {
        if (followingList.includes(props.logName)) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
    }, [])

    const followLog = async(log: string) => {
        if (!await authCheck()) {
            // TODO
            console.log("logout")
        }
        setLoadingFollow(true)

        const data: Object = {
            userId: USER_ID,
            logName: log,
        }

        const requestFollow: Response = await fetch( URL + "/logs/add-log-follow", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response: any  = await requestFollow.json().catch((err: Error) => {
            console.log(err)
        })
        setLoadingFollow(false)
        if (response.status === "follow") {
            setFollowing(true)
        } else if (response.status === "unfollow") {
            setFollowing(false)
        }
        USER_ID = ""
    }

    return (
        <div>
            { loadingFollow ? 
            <button className="bg-emerald-800 duration-300 p-1 rounded-md text-gray-800">
                working...
            </button>
            :
            <button 
                className="bg-gray-400 hover:bg-emerald-500 duration-300 p-1 rounded-md text-gray-800"
                onClick={() => followLog(props.logName!)}>{following ? "Joined" : "Follow"}
            </button>
            }
        </div>
    )
}

export default FollowJoinLog