'use client'

import arrow from '../../../../../public/icons/Arrow.png'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLogDescription } from "@/app/context/LogDescriptionProvidertest"
import Image from 'next/image'


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

const AboutLogContainer = (props: any) => {

    const {desc} = useLogDescription()

    const [following, setFollowing] = useState<boolean>(false)
    const [showLogDesc, setShowLogDesc] = useState<boolean>(true)
    const [logName, setLogName] = useState<string>()
    const pathname: string | null = usePathname()

    useEffect(() => {

        const routeCheck: string | undefined = pathname?.split("/river/").pop()
        setLogName(routeCheck)
    
    }, [])


    const followLog = async(log: string) => {
        if (!await authCheck()) {
            // TODO
            console.log("logout")
        }

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
        
        if (response.status === "follow") {
            props.setFollowing(true)
        } else if (response.status === "unfollow") {
            props.setFollowing(false)
        }
        USER_ID = ""

    }


    return (
        <>
             <div className="py-3 px-2 mx-2 sm:px-5 text-gray-200 font-light rounded-md items-center space-y-2 sm:space-y-0 justify-between bg-gray-700/90 shadow-lg shadow-gray-800/60">
                <h1>log/{logName}</h1>
                <div className="pt-2">
                <button 
                        className="bg-gray-400 hover:bg-emerald-500 duration-300 p-1 rounded-md text-gray-800"
                        onClick={() => followLog(logName!)}>{props.following ? "Joined" : "Follow"}</button>
                </div>
                { showLogDesc ? 
                <p className="text-left text-sm font-extralight pt-5">{desc}</p>
                :
                <></>
                }
                <div className="flex items-center justify-center">
                <Image 
                src={arrow}
                alt=""
                width={30}
                className={showLogDesc ? "bg-gray-500 mr-2 cursor-pointer p-1 rounded-md duration-300 -rotate-90" : "bg-gray-500 mr-2 cursor-pointer p-1 rounded-md duration-300 rotate-90"}
                onClick={() => setShowLogDesc((prev: boolean) => !prev)} />
                { showLogDesc ? 
                <p className="text-sm">Hide</p>
                : 
                <p className='text-sm'>Show</p>
                }
                </div>
            </div>
        </>
    )
}

export default AboutLogContainer